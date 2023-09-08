import { useEffect, useState } from "react";
import { shuffleColor } from "./methods/method-loader";
import storage from "@/utils/storage";
import { getIndividualById } from "./call-api";
import { useToast } from "@chakra-ui/react";

const useTestData = () => {
  const [getTestData, setTestData] = useState(null);

  useEffect(() => {
    const data = storage.getJSON("user");
    setTestData(data);
  }, []);

  return [getTestData];
};

const useShuffle = (data) => {
  const [getShuffle, setShuffle] = useState(null);

  useEffect(() => {
    const shuffled = data?.value.map((item) => {
      const arrayValue = item.value;
      const filterRemovable = arrayValue.filter(
        (val) => val.status === "removable"
      );
      const firstArray = arrayValue[0];
      const shuffle = shuffleColor(filterRemovable);
      const lastArray = arrayValue[arrayValue.length - 1];
      const newArrayValue = [...shuffle];
      return {
        row: item.row,
        value: newArrayValue,
        first: firstArray,
        last: lastArray,
      };
    });
    setShuffle(shuffled);
  }, [data]);

  return [getShuffle];
};

const useLoadUser = () => {
  const toast = useToast();
  const [getResultData, setResultData] = useState(null);

  useEffect(() => {
    const id = storage.getJSON("id");

    getIndividualById(id).then((data) => {
      const { err, d } = data;
      if (!err) {
        setResultData(d);
      } else {
        toast({
          title: `Terjadi Kesalahan`,
          description: `${d}`,
          status: "error",
          isClosable: true,
          containerStyle: {
            padding: "15px 20px",
          },
        });
      }
    });
  }, [toast]);

  return [getResultData];
};

const useDiagram = () => {
  const [getDiagram, setDiagram] = useState(null);

  useEffect(() => {
    const discriminant = storage.getJSON("discriminant");
    setDiagram(discriminant);
  }, []);

  return [getDiagram];
};

export { useTestData, useShuffle, useLoadUser, useDiagram };
