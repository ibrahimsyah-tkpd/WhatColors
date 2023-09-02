import { Box, Flex, Text, VStack } from "@chakra-ui/react";

export default function UserData() {
  return (
    <Box as="section" margin={4} fontSize={{ base: "xs", xs: "sm", md: "md" }}>
      <Flex direction={{ base: "column", md: "row" }}>
        <Flex flex={1}>
          <VStack alignItems={"flex-start"}>
            <Text as={"span"} fontWeight={"bold"}>
              Nama
            </Text>
            <Text as={"span"} fontWeight={"bold"}>
              Umur
            </Text>
            <Text as={"span"} fontWeight={"bold"}>
              Jenis Kelamin
            </Text>
          </VStack>
          <VStack ml={2} alignItems={"flex-start"}>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
          </VStack>
        </Flex>
        <Flex flex={1} mt={{ base: 2, md: "auto" }}>
          <VStack alignItems={"flex-start"}>
            <Text as={"span"} fontWeight={"bold"}>
              Perangkat Tes
            </Text>
            <Text as={"span"} fontWeight={"bold"}>
              Jenis Tes
            </Text>
            <Text as={"span"} fontWeight={"bold"}>
              Waktu
            </Text>
          </VStack>
          <VStack ml={1.5} alignItems={"flex-start"}>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
            <Box>
              <Text as={"span"} fontWeight={"bold"}>
                :
              </Text>{" "}
            </Box>
          </VStack>
        </Flex>
      </Flex>
    </Box>
  );
}
