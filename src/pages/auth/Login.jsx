import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Center,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    Checkbox,
    HStack,
    Flex,
    Image,
    Link,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { login, reset } from '../../features/auth/authSlice';
import { ToastChakra } from '../../helpers/toast';

const LoginPage = () => {

    const [correo, setCorreo] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const { ROLE, isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (isError) {
            ToastChakra('Error', message, 'error', 1500, 'top-right');
        }

        dispatch(reset());

    }, [dispatch, isError, isSuccess, message, navigate, ROLE]);

    const correoUsuario = window.localStorage.getItem('usuario_correo');

    const handleLogin = () => {
        try {
            const userData = {
                correo,
                password,
            };
            if (checked === true) {
                window.localStorage.setItem('usuario_correo', userData.correo);
            } else {
                window.localStorage.removeItem('usuario_correo');
            }
            dispatch(login(userData));
        } catch (err) {
            ToastChakra('Error', err.message, 'error', 3000);
        }
    };

    const content = (isLoading) ? (
        <Center h={'100vh'} w={'full'}>
            <Stack spacing={4} px={4} direction="column" align={'center'}>
                <Text fontSize="xl" fontWeight="bold">
                    {' '}
                    Iniciando Sesión ...{' '}
                </Text>
                <Spinner
                    thickness="4px"
                    speed="0.5s"
                    emptyColor="gray.200"
                    color="purple.500"
                    size="xl"
                />
            </Stack>
        </Center>
    ) : (
        <HStack spacing={2} w={'full'} h={'100vh'} bgImage="https://204.199.168.56/assets/layout/images/lineas-fondo-login.png" px={{ base: 4, lg: 28}} py={{base: 14, lg: 20}}>
            <Flex w="full" h="full" display={{ base: 'none', lg: 'flex'}}>
                <Box justifyContent="center" w="full">
                        <Image
                            objectFit={'cover'}
                            w={'full'}
                            h={'full'}
                            src="https://204.199.168.56/assets/layout/images/pasante1.webp"
                            rounded={'lg'}
                        />
                </Box>
            </Flex>
            <Flex w="full" h="full">
                <Box borderWidth={1} w="full" h="full" px={{ base : 8, lg: 10}} mr={2} bg="white" _dark={{ bg: 'primary.900'}} alignItems={'center'} justifyContent={'center'} borderRadius="lg" boxShadow={'base'}>
                    <Stack w="full" h="full" spacing={4} alignItems="center" justifyContent="center">
                        <Image src="https://react-material.fusetheme.com/assets/images/logo/logo.svg" w={16} />
                        <Heading textAlign={'center'} fontSize="xl" fontWeight="bold" mt={2}>
                            Sistema de Administración de una API
                        </Heading>
                        <FormControl id="email">
                            <FormLabel mt={4}>Email Address</FormLabel>
                            <Input
                                type="email"
                                placeholder='Ingrese su correo'
                                defaultValue={correoUsuario ? correoUsuario : ''}
                                onChange={(e) => setCorreo(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                placeholder='Ingrese su contraseña'
                                onChange={e => setPassword(e.target.value)}
                            />
                        </FormControl>
                        <Stack direction="row" align={'start'} justifyContent="space-between" w="full">
                            <Checkbox
                                defaultChecked={!correoUsuario ? false : true}
                                value={checked}
                                onChange={e => setChecked(e.target.checked)}
                            >
                                Recuerdame
                            </Checkbox>
                            <Link as={NavLink} to="/forgot-password" color='messenger.500' _hover={{ textDecoration: 'none' }}>
                                ¿Olvidó su contraseña?
                            </Link>
                        </Stack>
                        <FormControl>
                            <Button
                                w="full"
                                colorScheme={'messenger'}
                                _dark={{ bg: "messenger.500", color: "white", _hover: { bg: "messenger.700" } }}
                                onClick={handleLogin}
                                disabled={password === ''}
                            >
                                Iniciar Sesión
                            </Button>
                        </FormControl>
                        <NavLink to="/register">
                            <Text fontSize="sm" color="gray.600" _dark={{ color: 'gray.400'}}>
                                ¿No tiene una cuenta? Regístrese
                            </Text>
                        </NavLink>
                    </Stack>
                </Box>
            </Flex>
        </HStack>
    );

    return content;
};

export default LoginPage;
