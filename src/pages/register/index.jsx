import { Form, TextInput,SaveButton,PasswordInput,useRedirect} from 'react-admin';
import { authProvider } from "./../../authProvider";
import { useNotify } from 'react-admin';

import './index.css';


const RegisterPage = () => {
    const notify = useNotify();
    const {register} = authProvider;
    const redirect = useRedirect();

    // submit
    const handleSubmit = (data) => {
        // console.log(data);
        register(data)
            .then((res) => {
                if (res.status === 200) {
                    notify('register success', { type: 'info' });
                    redirect('/login');
                } else {
                    notify('register failed', { type: 'error' });
                }
            })
            .catch((err) => {
                console.log(err);
                // 解析HttpError错误信息
                notify('register failed', { type: 'error' });
            });
    };

    const validateUserCreation = (values) => {
        const errors = {};
        if (!values.username) {
            errors.username = 'The username is required';
        }
        const emailReg = /^([a-zA-Z0-9]+[-_\\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
        if (!emailReg.test(values.email)) {
            errors.email = 'The email format is incorrect';
        }

        if (!values.email) {
            errors.email = 'The email is required';
        }
        
        // password rule: 6-20 digits and letters, at least one digit and one letter
        const passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
        if (!passwordReg.test(values.password)) {
            errors.password = 'The password is require 6-20 digits and letters, at least one digit and one letter';
        }

        if (!values.password) {
            errors.password = 'The password is required';
        }
        if (!values.confirmPassword) {
            errors.confirmPassword = 'The confirm password is required';
        }
        if (values.password !== values.confirmPassword) {
            errors.confirmPassword = 'The password and confirm password are not the same';
        }

        return errors
    };


    return (
        <div className='register'>
            <h2 className='title'>注册</h2>
            <create>
                <Form className='form' validate={validateUserCreation}  onSubmit={handleSubmit}>
                    <TextInput className='input' label="用户名" source="username"  />
                    {/* 邮箱 */}
                    <TextInput className='input' label="邮箱" source="email" />
                    <PasswordInput className='input' source="password" />
                    <PasswordInput className='input' source="confirmPassword" />
                    <SaveButton label='submit' />
                </Form>
            </create>
        </div>
    );
};

export default RegisterPage;