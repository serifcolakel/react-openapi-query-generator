import { faker } from "@faker-js/faker";
import { useState } from "react";
import { Star, Trash2 } from "lucide-react";
import HighlightedInput, { getOptionValue } from "@/components/highlight-input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import CopyText from "@/components/copy-text";

function HighlightExample() {
  const [options, setOptions] = useState([
    {
      value: "https://jsonplaceholder.typicode.com/todos",
      name: "TEST_URL",
    },
  ]);

  const isUrl = (url: string): boolean => {
    try {
      new URL(getOptionValue(url, options));
      // new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const optionNameFormat = (name: string) =>
    name.replace(/\s/g, "_").toLocaleUpperCase();

  const handleAddOption = () => {
    setOptions((prev) => [
      ...prev,
      {
        name: optionNameFormat(faker.finance.accountName()),
        value: faker.internet.url(),
      },
    ]);
  };

  const handleDeleteOption = (index: number) => {
    setOptions((prev) => prev.filter((_, i) => i !== index));
  };

  const [url, setUrl] = useState("https://jsonplaceholder.typicode.com/todos");

  const resultUrl = isUrl(url) ? new URL(getOptionValue(url, options)) : "";

  const finalUrl = typeof resultUrl === "object" ? resultUrl.href : "";

  return (
    <div className="w-full">
      <div className="flex flex-row gap-4">
        <HighlightedInput
          onChange={(event) => setUrl(event.target.value)}
          options={options}
          value={url}
          className="mb-4"
        />
        <Button className="mb-4" onClick={handleAddOption}>
          Add Option
        </Button>
      </div>
      <article className="flex flex-row gap-x-2">
        <Label className="text-lg select-none">Result URL:</Label>
        <Label weight={"bold"} className="text-lg select-none">
          {finalUrl}
        </Label>
        <CopyText text={finalUrl} />
      </article>
      <article className="py-4">
        <Label className="text-lg">
          Options:{" "}
          <Label className="text-xs">
            (Click on the trash icon to delete an option)
          </Label>
        </Label>
      </article>
      <section
        hidden={options.length === 0}
        className="overflow-hidden border rounded-lg"
      >
        {options.map((option, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center px-4 py-2 border-b gap-x-2 last:border-none hover:bg-primary-foreground hover:bg-opacity-10"
          >
            <Star
              size={16}
              className="text-primary fill-primary dark:text-muted-foreground dark:fill-muted-foreground"
            />
            <Label
              className="flex flex-row items-center select-none"
              weight={"bold"}
            >
              <CopyText text={option.name} />
              {option.name}:
            </Label>
            <Label className="select-none">{option.value}</Label>
            <Button
              variant={"ghost"}
              className="p-2 m-0 ml-auto mr-0 cursor-pointer text-destructive"
            >
              <Trash2 size={16} onClick={() => handleDeleteOption(index)} />
            </Button>
          </div>
        ))}
      </section>
    </div>
  );
}

export default HighlightExample;
