import {
  Box,
  Image,
  Badge,
  Text,
  Flex,
  Stack,
  Avatar,
  VStack,
  HStack,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import PostInteraction from "../PostInteraction";

interface FakePostProps {
  postData: any;
}

const FakePost: React.FC<FakePostProps> = ({ postData }) => {
  const {
    title,
    imageUrl,
    imageAlt,
    user,
    avatar,
    createdAt,
    postFlair,
    flairColor,
    flairType,
    group,
  } = postData;

  const postVote = Math.floor(Math.random()*(200) + 1 );
  const comments = Math.floor(Math.random()* 30 + 1);
  return (
    <VStack spacing={{ base: 5, md: 5 }}>
      
      <Box
        borderWidth="1px"
        borderRadius="lg"
        bg="white"
        pb={8}
        w={{ base: "full", md: "xl" }}
        mb={5}
      >
        <Stack spacing={10}>
          <Flex direction="row" justify="space-between" px={3}>
            <Flex px={2} pt={3}>
              <Avatar size="md" src={avatar} />
              <Stack ml={3}>
                <Text fontSize={{ base: 14, md: 18 }} fontWeight={600} mb={-2}>
                  {group}
                </Text>
                <Flex>
                  <Text fontSize="0.6rem" mr={2}>
                    Posted by {user}
                  </Text>
                  <Text fontSize="0.6rem">{createdAt}</Text>
                </Flex>
              </Stack>
              <Box>
                <Badge colorScheme={flairColor} variant={flairType} ml={2}>
                  {postFlair}
                </Badge>
              </Box>
            </Flex>
            <Flex direction="row" justify="flex-end">
              <IconButton
                icon={<BsThreeDots />}
                variant="ghost"
                aria-label="More Options"
                mr={2}
                mt={1}
              />
            </Flex>
          </Flex>

          <Stack px={6}>
            <Heading as="h4" fontSize={24} fontWeight={400}>
              {title}
            </Heading>
            <Box maxW="md" maxH="md" overflow="hidden" borderRadius={30}>
              <Image
                src={imageUrl ? imageUrl : null}
                alt={imageAlt ? null : imageAlt}
                style={{ borderRadius: "30px" }}
              />
            </Box>
          </Stack>
          <Box maxW="full" maxH="lg" alignItems="center">
            <PostInteraction postVote={postVote} comments={comments}/>
          </Box>
        </Stack>
      </Box>
    </VStack>
  );
};

export default FakePost;
