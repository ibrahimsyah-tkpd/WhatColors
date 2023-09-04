import { Box } from "@chakra-ui/react";
import UserData from "@/components/test/UserData";
import TestSheet from "@/components/test/TestSheet";
import { useShuffle, useTestData } from "@/utils/customHooks";
import { testResult, userData } from "@/utils/test-helper";
import { useState } from "react";
import { reunitedColor } from "@/utils/methods/method-loader";
import { newIndividual } from "@/utils/call-api";

export default function TestPage() {
  const [getTestData] = useTestData();
  const [getShuffle] = useShuffle(getTestData);
  const [getTestResult, setTestResult] = useState(null);

  const isClient = getTestData?.isClient;
  const user = userData(getTestData, isClient);

  const handleTestResult = (row, newState) => {
    const newRemovable = getShuffle.map((removable) => {
      if (removable.row === row) {
        removable.value = newState;
      }

      return removable;
    });

    setTestResult(newRemovable);
  };

  const testData = reunitedColor(getTestResult);
  const initiate = getTestData?.value;
  const result = testResult(testData, initiate, user);

  const individualUser = async (res) => {
    const { err, d } = await newIndividual(res);
    console.log(err);
    console.log(d);
  };

  const onSubmit = () => {
    individualUser(result);
  };

  return (
    <Box my={6}>
      <UserData user={user} />
      <TestSheet
        test={getShuffle}
        handle={handleTestResult}
        submit={onSubmit}
      />
    </Box>
  );
}
