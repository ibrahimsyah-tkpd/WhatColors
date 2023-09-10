import { newIndividual } from "@/utils/call-api";
import { reunitedColor } from "@/utils/methods/method-loader";
import storage from "@/utils/storage";
import { testResult } from "@/utils/test-helper";
import { Box, Button, Center, Flex, Text, useToast } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import Sortable from "./Sortable";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

const MAX_MINUTES = 12;
const formatTime = (time) =>
  [time.getMinutes(), time.getSeconds()]
    .map((num) => `0${num}`.slice(-2))
    .join(":");

export default function TestSheet({ test, user, init }) {
  const navigate = useNavigate();
  const toast = useToast();
  const [getTestResult, setTestResult] = useState(null);
  const [getTimelapse, setTimelapse] = useState(new Date(0));
  const [getTestDone, setTestDone] = useState(false);
  const [getFinalData, setFinaldata] = useState({});
  const interval = useRef(null);
  const time = `${formatTime(getTimelapse)}`;

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: newIndividual,
    onSuccess: (data) => {
      storage.setJSON("id", data);
      navigate("/result");
    },
    onError: (error) => {
      setTestDone(false);
      toast({
        title: `Terjadi Kesalahan`,
        description: `${error.response.data.message}`,
        status: "error",
        isClosable: true,
        containerStyle: {
          padding: "15px 20px",
        },
      });
    },
  });

  const handleTestResult = (row, newState) => {
    const newRemovable = test.map((removable) => {
      if (removable.row === row) {
        removable.value = newState;
      }

      return removable;
    });

    setTestResult(newRemovable);
  };

  const reunited = reunitedColor(getTestResult);

  const onFinish = () => {
    setTestDone(true);
    stopTime();
    const result = testResult(reunited, init, user, time);
    setFinaldata(result);
  };

  const onSubmit = () => {
    mutateAsync(getFinalData);
  };

  const stopTime = useCallback(() => {
    clearTimeout(interval.current);
    interval.current = null;
  }, []);

  const updateTimer = useCallback(() => {
    if (getTimelapse.getMinutes() >= MAX_MINUTES) {
      onFinish();
      return;
    }

    setTimelapse((prev) => new Date(prev.getTime() + 1000));
  }, [getTimelapse, setTimelapse]);

  useEffect(() => {
    interval.current = setTimeout(updateTimer, 1000);
    return () => clearTimeout(interval.current);
  }, [getTimelapse, updateTimer]);

  return (
    <Box pt={5}>
      <Text textAlign={"center"} fontWeight={"medium"} mb={6} fontSize={"xl"}>
        {formatTime(getTimelapse)}
      </Text>
      {test?.map((data) => (
        <Flex
          flexWrap={"wrap"}
          flexDirection={"row"}
          key={data.row}
          margin={"8px auto"}
          width={{ xl: "5xl" }}
        >
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"flex-start"}
            margin={"4px 8px 4px 1px"}
          >
            <Box
              key={data.first}
              backgroundColor={data.first.color}
              width={{ base: 6, xs: 8, lg: 10 }}
              height={{ base: 6, xs: 8, lg: 10 }}
            >
              <Text
                textAlign={"center"}
                fontSize={{ base: "7px", xs: "10px", lg: "small" }}
                fontWeight={"bold"}
                color={"white"}
              >
                Awal
              </Text>
            </Box>
          </Box>
          <Sortable
            handle={handleTestResult}
            data={data}
            testDone={getTestDone}
          />
          <Box
            flex={1}
            display={"flex"}
            justifyContent={"flex-end"}
            margin={"4px 1px 4px 8px"}
          >
            <Box
              key={data.last}
              backgroundColor={data.last.color}
              width={{ base: 6, xs: 8, lg: 10 }}
              height={{ base: 6, xs: 8, lg: 10 }}
            >
              <Text
                textAlign={"center"}
                fontSize={{ base: "7px", xs: "10px", lg: "small" }}
                fontWeight={"bold"}
                color={"white"}
              >
                Akhir
              </Text>
            </Box>
          </Box>
        </Flex>
      ))}
      <Center mt={8}>
        {getTestDone ? (
          <Button
            size={{ base: "sm", sm: "md" }}
            colorScheme="teal"
            onClick={onSubmit}
            loadingText="Mengirim Hasil"
            isLoading={isLoading}
          >
            Kirim Data
          </Button>
        ) : (
          <Button
            size={{ base: "sm", sm: "md" }}
            colorScheme="teal"
            onClick={onFinish}
          >
            Selesai
          </Button>
        )}
      </Center>
    </Box>
  );
}
