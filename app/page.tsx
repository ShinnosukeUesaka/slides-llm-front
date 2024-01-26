"use client";
import Image from "next/image";
import ThreeCard from "../components/ThreeCard";
import IntroSlide from "../components/IntroSlide";
import TimeLine from "../components/TimeLine";
import React, { useState, useEffect, useRef } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

import axios from "axios";

type Action = ShowSlideAction | DisplayElementAction | PlayAudioAction;

type ShowSlideAction = {
  type: "show_slide";
  content: SlideContent;
};

type DisplayElementAction = {
  type: "display_element";
  content: {
    ids: string[];
  };
};

type PlayAudioAction = {
  type: "play_audio";
  content: {
    url: string;
  };
};

type SlideContent =
  | MenuContent
  | IntroSlideContent
  | ThreeElementsContent
  | TimelineContent;

type VisibleContent =
  | MenuVisibleContent
  | IntroSlideVisibleContent
  | ThreeElementsVisibleContent
  | TimelineVisibleContent;

type IntroSlideContent = {
  template_id: "first_slide";
  title: string;
  sub_title: string;
  image: string;
};

type IntroSlideVisibleContent = {
  title: boolean;
  sub_title: boolean;
  image: boolean;
};

type MenuContent = {
  template_id: "menu";
};

type MenuVisibleContent = {};

type ThreeElementsContent = {
  template_id: "three_elements";
  title: string;
  elements: {
    title: string;
    details: string;
    image: string;
  }[];
};

type ThreeElementsVisibleContent = {
  title: boolean;
  element_1: boolean;
  element_2: boolean;
  element_3: boolean;
};

type TimelineContent = {
  template_id: "timeline";
  title: string;
  elements: {
    title: string;
    details: string;
    time: string;
  }[];
};

type TimelineVisibleContent = {
  title: boolean;
  element_1: boolean;
  element_2: boolean;
  element_3: boolean;
};

export default function Home() {
  return <SlideShowComponent />;
}

const SlideShowComponent = () => {
  const [waitingForInput, setWaitingForInput] = useState(true);
  const [loading, setLoading] = useState(false);

  const [actions, setActions] = useState<Action[]>([]);
  const [currentActionIndex, setCurrentActionIndex] = useState(0);
  const [slideContents, setSlideContents] = useState<SlideContent[]>([
    {
      template_id: "menu",
    },
  ]);
  const [visibleContents, setVisibleContents] = useState<VisibleContent[]>([
    {},
  ]);
  const [slideIndex, setSlideIndex] = useState(0); // content starts from 0, it is -1 when no content is shown
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [api, setApi] = React.useState<CarouselApi>();

  useEffect(() => {
    setAudio(new Audio());
  }, []);

  useEffect(() => {
    console.log("Slide contents changed:", slideIndex);
    console.log(api?.canScrollNext());
    // sleep for 1 second
    setTimeout(() => {
      console.log(api?.canScrollNext());
      api?.scrollTo(slideIndex);
    }, 500); // wait for 0.5 seconds until the elements are properly rendered and configured
  }, [slideContents]);

  const startEverything = () => {
    console.log("Starting everything");
    setLoading(true);
    const prompt = inputRef.current?.value;
    axios
      .post("https://prd-slidesllm-cilyjke37q-an.a.run.app/conversations")
      .then((response) => {
        console.log("Response:", response);
        const conversationId = response.data.id;
        axios
          .post(
            `https://prd-slidesllm-cilyjke37q-an.a.run.app/conversations/${conversationId}/message`,
            {
              message: prompt,
            }
          )
          .then((response) => {
            console.log("Response:", response);
            setLoading(false);
            setActions(response.data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const executeAction = (action: Action) => {
    console.log("Executing action:", action);
    switch (action.type) {
      case "show_slide":
        setSlideContents((prev) => [...prev, action.content]);
        if (action.content.template_id === "first_slide") {
          setVisibleContents((prev) => [
            ...prev,
            { title: false, sub_title: false, image: false },
          ]);
        } else if (action.content.template_id === "three_elements") {
          setVisibleContents((prev) => [
            ...prev,
            {
              title: false,
              element_1: false,
              element_2: false,
              element_3: false,
            },
          ]);
        } else if (action.content.template_id === "timeline") {
          setVisibleContents((prev) => [
            ...prev,
            {
              title: false,
              element_1: false,
              element_2: false,
              element_3: false,
            },
          ]);
        }
        setSlideIndex((prev) => prev + 1);
        break;

      case "display_element":
        const newVisibility: { [key: string]: boolean } = {};
        console.log(action.content.ids);
        action.content.ids.forEach((id: string) => {
          newVisibility[id] = true;
        });
        console.log("New visibility:", visibleContents);
        setVisibleContents((prev) => [
          ...prev.slice(0, -1),
          { ...prev[prev.length - 1], ...newVisibility },
        ]);

        break;

      case "play_audio":
        if (!audio) {
          console.error("Audio element not initialized");
          return;
        }
        audio.src = action.content.url;
        audio
          .play()
          .catch((error) => console.error("Error playing audio:", error));

        break;
      default:
        console.error("Unknown action type:", action);
    }
  };

  useEffect(() => {
    if (actions?.length > 0 && currentActionIndex < actions.length) {
      const currentAction: Action = actions[currentActionIndex];
      executeAction(currentAction);

      if (currentAction.type !== "play_audio") {
        setTimeout(() => {
          setCurrentActionIndex(currentActionIndex + 1);
        }, 500); // For example, wait for 0.5 seconds
      } else {
        const handleAudioEnd = () => {
          setCurrentActionIndex(currentActionIndex + 1);
          if (!audio) {
            console.error("Audio element not initialized");
            return;
          }
          audio.removeEventListener("ended", handleAudioEnd);
        };
        if (!audio) {
          console.error("Audio element not initialized");
          return;
        }
        audio.addEventListener("ended", handleAudioEnd);
      }
    }
  }, [currentActionIndex, actions]);

  let carouselItems = slideContents.map((slideContent, index) => {
    let slideComponent;
    if (slideContent.template_id === "menu") {
      slideComponent = [
        (loading && (<div className="loader">
          <div className="loader-inner">
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
            <div className="loader-line-wrap">
              <div className="loader-line"></div>
            </div>
          </div>
        </div>))
      ];
    } else if (slideContent.template_id === "first_slide") {
      slideComponent = (
        <IntroSlide
          content={slideContent}
          visibleContent={visibleContents[index] as IntroSlideVisibleContent}
        />
      );
    } else if (slideContent.template_id === "three_elements") {
      slideComponent = (
        <ThreeCard
          content={slideContent}
          visibleContent={visibleContents[index] as ThreeElementsVisibleContent}
        />
      );
    } else if (slideContent.template_id === "timeline") {
      console.log("Timeline visible content:", visibleContents[index]);
      slideComponent = (
        <TimeLine
          content={slideContent}
          visibleContent={visibleContents[index] as TimelineVisibleContent}
        />
      );
    }

    return (
      <CarouselItem key={index} className="flex justify-center">
        <div className="w-[100%] bg-zinc-100 max-w-screen-lg shadow-3xl rounded-2xl aspect-[16/9] m-12 mb-16">
          {slideComponent}
        </div>
      </CarouselItem>
    );
  });

  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center gap-4 p-2 ">
      <Carousel className="w-full" setApi={setApi}>
        <CarouselContent>{carouselItems}</CarouselContent>
      </Carousel>
      {/* <div className="h-40 w-32 bg-green-50">
      </div> */}

      <div className="w-full max-w-lg flex justify-between items-center relative -top-12 gap-4 bg-black rounded-3xl p-2">
        <Label className="sr-only" htmlFor="input-field">
          Input Field
        </Label>
        <Input
          className="flex-grow text-white bg-black placeholder-white border-0 rounded-3xl focus:outline-none focus-visible:ring-offset-0 focus:ring-0"
          id="input-field"
          placeholder="Enter text here"
          ref={inputRef}
        />
        <Button
          className="bg-white text-black p-2 rounded-3xl"
          onClick={startEverything}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17 8l4 4m0 0l-4 4m4-4H3"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        </Button>
      </div>
    </div>
  );
};
function Component() {
  return (
    <div className="flex flex-row items-center justify-center p-6 w-full h-full">
      <div className="flex-grow basis-1/3 bg-black h-full"></div>
      <div className="flex-grow basis-2/3 bg-green-50 h-full"></div>
    </div>
  );
}
