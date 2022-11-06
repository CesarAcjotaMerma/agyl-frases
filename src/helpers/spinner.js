import { Center, Flex, Spinner, Stack, Text } from "@chakra-ui/react";

export function SpinnerComponent () {

    return (
        <Flex alignItems="center" h={'100%'} w={'full'} justifyContent="center">
            <Center>
                <Stack spacing={4} px={4} direction="column" align={'center'}>
                    <Text fontSize="xl" fontWeight="bold">
                        {' '}
                        Cargando ...{' '}
                    </Text>
                    <Spinner
                        thickness="2px"
                        speed="0.5s"
                        emptyColor="gray.200"
                        color="purple.500"
                        size="xl"
                        variant={'solid'}
                    />
                </Stack>
            </Center>
        </Flex>
    )
}