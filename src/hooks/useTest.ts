import { Handler } from "@/types";
import { fetcher } from "@/lib/fetcher";
import { executeTests } from "@/helpers/tests";
import { sleep } from "@/helpers/async";

type ExecuteTestProps = {
  test: string;
  result: Awaited<ReturnType<typeof fetcher>>;
};

type Props<T extends { id: string }> = {
  selected: string;
  setSelected: (value: string) => void;
  create: (form: FormData) => Promise<void>;
  update: (form: FormData) => Promise<void>;
  delete: (form: FormData) => Promise<void>;
  data: T[];
};

export default function useTest<T extends { id: string }>({
  selected,
  setSelected,
  create,
  update,
  delete: del,
  data: variables,
}: Props<T>) {
  const revalidateData = async () => {
    localStorage.setItem("selected", JSON.stringify(selected));

    await sleep(20);
    setSelected(selected);
    await sleep(20);

    setSelected(JSON.parse(localStorage.getItem("selectedEnvironment")!));
  };

  const environment: Handler["environment"] = {
    set: async (key, value) => {
      if (!selected) {
        return;
      }

      const variable = variables.find((v) => v.id === key);

      if (variable) {
        const form = new FormData();

        form.append("id", variable.id);
        form.append("name", key);
        form.append("value", String(value));

        // await updateVariable(form);
        console.log("updateVariable", form);
        await update(form);
      } else {
        const form = new FormData();

        form.append("name", key);
        form.append("value", String(value));
        form.append("id", variables[0].id);

        // await createVariable(form);
        console.log("createVariable", form);
        await create(form);
      }

      await revalidateData();
    },
    replace: async (key, value) => {
      if (!selected) {
        return;
      }

      const variable = variables.find((v) => v.id === key);

      if (variable) {
        setSelected("");
        const form = new FormData();

        form.append("id", variable.id);
        form.append("name", key);
        form.append("value", String(value));

        // await updateVariable(form);
        console.log("updateVariable", form);
        await update(form);

        await revalidateData();
      }
    },
    get: (key) => {
      const variable = variables.find((v) => v.id === key);

      return variable?.id;
    },
    unset: async (key) => {
      const variable = variables.find((v) => v.id === key);

      if (variable) {
        const form = new FormData();

        form.append("id", variable.id);

        // await deleteVariable(form);
        console.log("deleteVariable", form);
        await del(form);

        await revalidateData();
      }
    },
  };

  const executeTest = async ({ test, result }: ExecuteTestProps) => {
    return executeTests(test, result, { environment });
  };

  return { executeTest };
}
