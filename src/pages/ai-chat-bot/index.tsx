"use client";

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserIcon,
  SendIcon,
  XIcon,
  TrashIcon,
  EllipsisVertical,
  Clock,
  Bot,
  MessageCircle,
  FactoryIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "@/hooks/use-toast";
import Video from "@/components/ui/video";

type Conversation = {
  message: string;
  isUser: boolean;
  isError?: boolean;
  id: string;
  date: string;
};

type AICapabilities = {
  isChrome: boolean;
  message: string;
  state?: {
    available: "readily" | "after-download" | "no";
  };
};

const AISetupGuide: React.FC = () => {
  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>Setting up the window.ai API</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6" variant={"destructive"}>
          <AlertTitle>Important</AlertTitle>
          <AlertDescription>
            To access the window.ai API, you need to download either Chrome Dev
            or Canary browser version 127 or higher.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="download" className="w-full mx-auto space-y-4">
          <TabsList className="w-full mx-auto">
            <TabsTrigger className="w-full" value="download">
              Download
            </TabsTrigger>
            <TabsTrigger className="w-full" value="configure">
              Configure
            </TabsTrigger>
            <TabsTrigger className="w-full" value="update">
              Update
            </TabsTrigger>
            <TabsTrigger className="w-full" value="check">
              Check
            </TabsTrigger>
          </TabsList>
          <TabsContent value="download">
            <div className="space-y-2">
              <p>
                Visit the{" "}
                <a
                  href="https://www.google.com/chrome/dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Chrome Dev
                </a>{" "}
                or{" "}
                <a
                  href="https://www.google.com/chrome/canary/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Chrome Canary
                </a>{" "}
                download page and install the browser.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="configure">
            <div className="space-y-2">
              <p>
                <strong>Enable Prompt API for Gemini Nano:</strong> Navigate to
                chrome://flags/#prompt-api-for-gemini-nano and select "Enabled"
              </p>
              <p>
                <strong>Enable Optimization Guide On Device Model:</strong>{" "}
                Navigate to{" "}
                <i>chrome://flags/#optimization-guide-on-device-model</i> and
                select <i>"EnabledBypassPrefRequirement"</i>
              </p>
            </div>
          </TabsContent>
          <TabsContent value="update">
            <div className="space-y-2">
              <p>
                1. Navigate to <strong>chrome://components</strong>
              </p>
              <p>
                2. Find <strong>"Optimization Guide On Device Model"</strong>
              </p>
              <p>
                3. Click its <strong>"Check for Update"</strong> button to
                download the model
              </p>
            </div>
          </TabsContent>
          <TabsContent value="check">
            <div className="space-y-2">
              <p>1. Run the following code in your browser console:</p>
              <code className="block p-2 text-sm bg-gray-100 rounded">
                await window.ai.assistant.capabilities()
              </code>
              <p>2. Ensure the response is:</p>
              <code className="block p-2 text-sm bg-gray-100 rounded">
                {"{ available: 'readily' }"}
              </code>
            </div>
          </TabsContent>
        </Tabs>

        <Alert className="mt-6" variant="warning">
          <AlertTitle>Note</AlertTitle>
          <AlertDescription>
            After completing these steps, restart your browser to ensure all
            changes take effect.
          </AlertDescription>
        </Alert>
      </CardContent>
      <CardContent>
        <video controls className="w-full h-auto">
          <source src="/AI_Setup_Guide.mov" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>
      <CardContent>
        <details data-cy="ai-chatbot-demo" className="cursor-pointer">
          <summary>AI Chatbot Demo YouTube Video</summary>
          <div className="w-full p-4 border rounded-lg bg-primary/5">
            <Video videoId="_xf9fSxIMNQ" />
          </div>
        </details>
      </CardContent>
    </Card>
  );
};

function getChromeVersion() {
  const raw = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
  return raw ? parseInt(raw[2], 10) : 0;
}

async function getCapabilities(): Promise<AICapabilities> {
  try {
    let isChrome = false;
    let message = "";
    const state = await (window as any).ai?.assistant.capabilities();
    if (navigator.userAgent.includes("Chrome")) {
      isChrome = (navigator as any).userAgentData?.brands.some(
        (brandInfo: { brand: string }) => brandInfo.brand === "Google Chrome"
      );
      if (!isChrome) {
        message =
          "Your browser is not supported. Please use Google Chrome Dev or Canary.";
      }
    } else {
      message =
        "Your browser is not supported. Please use Google Chrome Dev or Canary.";
    }
    const version = getChromeVersion();
    if (version < 127) {
      message =
        "Your browser is not supported. Please update to 127 version or greater.";
    }
    if (!("ai" in window)) {
      message =
        "Prompt API is not available, check your configuration in chrome://flags/#prompt-api-for-gemini-nano";
    }
    if (state?.available !== "readily") {
      message =
        "Built-in AI is not ready, check your configuration in chrome://flags/#optimization-guide-on-device-model";
    }

    return { isChrome, message, state };
  } catch (error) {
    console.error(error);

    return {
      isChrome: false,
      message: "An error occurred",
      state: undefined,
    };
  }
}

const getEngineeringPrompt = (issue: string, previousLogs?: Conversation[]) => {
  return `
          You are a technical support engineer, providing assistance to customers who have reported technical issues or require help with their engineering queries. Follow the rules below and consider the customer's previous logs to offer precise support.
  
          Previous support logs:
  
          ${previousLogs?.map(
            (log) =>
              `${log.isUser ? "Customer Issue: " : "Your Response: "}${
                log.message
              }`
          )}
  
          1. Create your response using only HTML elements.
          2. You can use the following HTML tags to create your response: <p>, <h1>, <h2>, <h3>, <ul>, <li>, <strong>, <em>, <a>, <code>, <pre>.
          3. Do not use style or class attributes in your response.
          4. Your response should be enclosed within a single root element, such as a <div> tag.
          5. Use the href attribute for links and use "#" instead of actual URLs.
          6. Provide step-by-step instructions, code snippets, or troubleshooting steps as needed.
          7. If you cannot resolve the issue with the given information, politely ask for more details or direct the customer to another team that can help.
  
          Here is the customer's issue:
  
          ${issue}
  
          Please respond to this issue according to the rules above and provide clear instructions.
      `;
};

const getInsurancePrompt = (
  query: string,
  oldConversations?: Conversation[]
) => {
  return `
          You are an insurance claims representative, helping customers with their insurance-related queries. Please follow the guidelines below and refer to the customer's past queries to offer accurate assistance.
  
          Previous queries and responses:
  
          ${oldConversations?.map(
            (q) =>
              `${q.isUser ? "Customer Query: " : "Your Response: "}${q.message}`
          )}
  
          1. Use only HTML elements to create your response.
          2. You can use the following HTML tags to format your response: <p>, <h1>, <h2>, <h3>, <ul>, <li>, <strong>, <em>, <a>.
          3. Avoid using style or class attributes in your response.
          4. Wrap your response within a single root element, such as a <div> tag.
          5. Use the href attribute for links, and replace URLs with "#".
          6. Be empathetic and clear in your communication. Provide necessary forms, requirements, or instructions.
          7. If you do not have the specific information the customer is seeking, direct them to a resource or a contact number that can assist further.
  
          Here is the customer's query:
  
          ${query}
  
          Please respond to this query while adhering to the rules and ensuring clarity and professionalism.
      `;
};

const getPrompt = (message: string, oldConversations?: Conversation[]) => {
  return `
        You are a customer service representative and you are answering questions from our customers. Please follow the rules below and consider the customer's previous conversations to assist the customer.

        Previous conversations of the customer:

        ${oldConversations?.map(
          (conv) =>
            `${conv.isUser ? "Customer Question: " : "Your Answer: "}${
              conv.message
            }`
        )}

        1. Create your response using only HTML elements.
        2. You can use the following HTML tags to create your response: <p>, <h1>, <h2>, <h3>, <ul>, <li>, <strong>, <em>, <a>, <code>, <pre>, <img>.
        3. Do not use style or class attributes in your response.
        4. Create your response within a single root element, such as a <div> tag.
        5. Use the href attribute for links and use "#" instead of actual URLs.
        6. Respond to the customer's question politely, professionally, and helpfully.
        7. If you do not have information about the question asked, kindly state this and direct the customer to another resource that can help.

        Here is the customer's question:

        ${message}

        Please respond to this question in accordance with the rules above and finish the sentence.
    `;
};

const generateId = () => {
  return crypto.randomUUID();
};

const sectors = [
  {
    name: "Engineering",
    description: "Technical support for engineering queries.",
  },
  {
    name: "Insurance",
    description: "Assistance with insurance-related queries.",
  },
  {
    name: "Customer Service",
    description: "General customer service support.",
  },
];

const Message = ({ onClose }: { onClose: () => void }) => {
  const [conversation, setConversation] = useState<Conversation[]>([]);
  const [capabilities, setCapabilities] = useState<AICapabilities>();
  const [message, setMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [isPending, setIsPending] = useState(false);
  const [sector, setSector] = useState("");

  const onFinish = async () => {
    if (!window?.ai || !message) return;
    const id = generateId();
    try {
      setIsPending(true);

      const ai = window?.ai;

      setConversation((prev) => [
        ...prev,
        { message, isUser: true, id, date: new Date().toISOString() },
      ]);

      const session = await ai.assistant.create();

      let prompt = "";

      if (sector === "Engineering") {
        prompt = getEngineeringPrompt(message, conversation);
      }

      if (sector === "Insurance") {
        prompt = getInsurancePrompt(message, conversation);
      }

      if (sector === "Customer Service") {
        prompt = getPrompt(message, conversation);
      }

      const response = await session.prompt(prompt);
      setConversation((prev) => [
        ...prev,
        {
          message: response,
          isUser: false,
          id,
          date: new Date().toISOString(),
        },
      ]);

      session.destroy();

      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });

      setMessage("");
    } catch (error) {
      setConversation((prev) => [
        ...prev,
        {
          message: "An error occurred.",
          isUser: false,
          isError: true,
          id,
          date: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsPending(false);
    }
  };

  const prepareCapabilities = () => {
    getCapabilities().then(setCapabilities);
  };

  useEffect(() => {
    const interval = setInterval(
      () => {
        prepareCapabilities();
      },
      1000 * 60 * 1 // 1 minute
    );

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    prepareCapabilities();
  }, []);

  const { isAvailable, needDownload, isNotAvailable } = {
    isAvailable: capabilities?.state?.available === "readily",
    needDownload: capabilities?.state?.available === "after-download",
    isNotAvailable: capabilities?.state?.available === "no" || !capabilities,
  };

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [conversation]);

  const handleDeleteAll = () => {
    setConversation([]);
    setSector("");
    toast({
      title: "Success",
      description: "All messages have been deleted.",
    });
  };

  const getResponseTime = (id: string) => {
    const userMessage = conversation.find((conv) => conv.id === id);
    const aiMessage = conversation.find(
      (conv) => conv.id === id && !conv.isUser
    );
    if (!userMessage || !aiMessage) return;
    const userDate = new Date(userMessage.date);
    const aiDate = new Date(aiMessage.date);
    const diff = aiDate.getTime() - userDate.getTime();
    return ` - Response Time: ${diff}ms (${diff / 1000}s)`;
  };

  const renderContent = () => {
    if (needDownload) {
      return (
        <ScrollArea viewportRef={chatContainerRef} className="h-[400px] p-2">
          <AISetupGuide />
        </ScrollArea>
      );
    }

    if (!isAvailable || isNotAvailable) {
      return (
        <ScrollArea viewportRef={chatContainerRef} className="h-[400px] p-2">
          <div className="px-6">
            <Alert variant="destructive">
              <AlertDescription>
                {capabilities?.message || "AI Chatbot is not available."}
              </AlertDescription>
            </Alert>
          </div>
          <AISetupGuide />
        </ScrollArea>
      );
    }

    if (!sector) {
      return (
        <div className="flex flex-col items-center justify-center flex-1 h-full my-auto gap-y-4 min-h-[400px]">
          <MessageCircle className="w-12 h-12 text-gray-500" />
          <p className="px-4 text-sm text-center text-gray-500">
            Select a sector to start a conversation. Our AI Chatbot can assist
            you with various fields such as Engineering, Insurance, and Customer
            Service. Choose the relevant sector to get tailored support and
            solutions.
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-x-2">
                <Bot className="w-5 h-5" />
                Select Sector
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sectors.map((sector) => (
                <DropdownMenuItem
                  key={sector.name}
                  onClick={() => setSector(sector.name)}
                >
                  <FactoryIcon className="w-4 h-4 mr-2" />
                  <span>{sector.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    }

    return (
      <>
        <ScrollArea className="h-[400px] px-2" viewportRef={chatContainerRef}>
          <div className="h-full space-y-4">
            {conversation?.length > 0 ? (
              conversation.map((item, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex gap-2",
                    item.isUser ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <Avatar>
                    <AvatarFallback>
                      {item.isUser ? <UserIcon /> : "AI"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      dangerouslySetInnerHTML={{ __html: item.message }}
                      className={cn(
                        "rounded-lg p-2 text-xs",
                        item.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted",
                        item.isError &&
                          "bg-destructive text-destructive-foreground"
                      )}
                    />
                    {item.date && (
                      <div
                        title={new Date(item.date).toLocaleString()}
                        className={cn(
                          "flex items-center w-full mt-1 text-xs text-gray-500",
                          item.isUser ? "justify-end" : "justify-start"
                        )}
                      >
                        <Clock className="inline-block w-4 h-4 mr-1" />
                        {new Date(item.date).toLocaleTimeString()}
                        {!item.isUser && getResponseTime(item.id)}
                      </div>
                    )}
                  </div>
                  {item.isError && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setConversation((prev) =>
                          prev.filter((conv) => conv.id !== item.id)
                        );
                      }}
                    >
                      <TrashIcon className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center flex-1 h-full my-auto gap-y-4">
                <MessageCircle className="w-12 h-12 text-gray-500" />
                <p className="text-sm text-gray-500">
                  Start a conversation with AI Chatbot.
                </p>
              </div>
            )}

            {isPending && (
              <div className="flex items-center space-x-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="flex items-center p-2 space-x-2">
          <Input
            disabled={isPending}
            placeholder="Type your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && onFinish()}
          />
          <DropdownMenu>
            <div className="flex flex-row ">
              <Button
                size="icon"
                variant={"ghost"}
                disabled={isPending || !message}
                onClick={onFinish}
              >
                <SendIcon className="w-4 h-4 text-primary hover:text-primary/90" />
              </Button>

              <DropdownMenuTrigger asChild>
                <Button size="icon" variant={"ghost"} disabled={isPending}>
                  <EllipsisVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent>
              <DropdownMenuItem
                disabled={isPending || conversation.length === 0}
                onClick={handleDeleteAll}
              >
                <TrashIcon className="w-4 h-4 mr-2" />
                <span>Delete all messages</span>
              </DropdownMenuItem>
              <DropdownMenuItem disabled={isPending} onClick={handleDeleteAll}>
                <FactoryIcon className="w-4 h-4 mr-2" />
                <span>Change sector</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </>
    );
  };

  const renderStatus = () => {
    if (!capabilities?.isChrome) {
      return {
        text: "🔴",
        description: "AI Chatbot is only available on Google Chrome.",
      };
    }
    if (isAvailable) {
      return {
        text: "🟢",
        description: "AI Chatbot is ready to use.",
      };
    }
    if (needDownload) {
      return {
        text: "🟠",
        description: "Necessary setup is required for AI Chatbot usage.",
      };
    }
    if (isNotAvailable) {
      return {
        text: "🔴",
        description: "AI Chatbot is not ready to use.",
      };
    }

    return {
      text: "🟠",
      description: "Necessary setup is required for AI Chatbot usage.",
    };
  };

  return (
    <Card className="w-[400px] overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between p-2 m-2 space-y-0 rounded-lg bg-primary">
        <div className="relative">
          <Avatar>
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="text"
                size="sm"
                className="absolute z-50 -top-2 -right-4"
              >
                {renderStatus().text}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{renderStatus().description}</TooltipContent>
          </Tooltip>
        </div>
        <CardTitle className="text-sm font-medium text-white dark:text-black">
          AI Chatbot
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="text-white dark:text-black dark:hover:text-white"
        >
          <XIcon className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0 mb-2">{renderContent()}</CardContent>
    </Card>
  );
};

const AIChatBot: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <PopoverTrigger asChild>
              <Button
                onClick={() => setOpen((prev) => !prev)}
                variant="outline"
                className="w-[60px] h-[60px] rounded-full fixed bottom-4 right-8 p-0 border-2 border-primary"
              >
                <Bot />
              </Button>
            </PopoverTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Start chatting with AI Chatbot.</p>
            <TooltipArrow />
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <PopoverContent className="w-[400px] p-0">
        <Message onClose={() => setOpen(false)} />
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

const AIChatBotWrapper: React.FC = () => {
  return (
    <div className="w-full">
      <AISetupGuide />
      <AIChatBot />
    </div>
  );
};

export default AIChatBotWrapper;
