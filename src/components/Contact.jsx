"use client"
import toast, { Toaster } from 'react-hot-toast';
import {useState} from "react";
import axios from "axios";


const Contacts = () => {

    let [FormValue,SetFormValue]=useState({fname:"",lname:"",email:"",msg:""})

    const inputOnChange = (name,value) => {
        SetFormValue(
            FormValue=>({
                ...FormValue,
                [name]:value
            })
        )
    }

    const FormSubmit=async (e) => {
        e.preventDefault();
        if (FormValue.fname.length === 0) {
            toast.error('First Name Required');
        } else if (FormValue.lname.length === 0) {
            toast.error('Last Name Required');
        } else if (FormValue.email.length === 0) {
            toast.error('Email Required');
        } else if (FormValue.msg.length === 0) {
            toast.error('Message Required');
        } else {
            const rawResponse = await axios.post('/api/contact',FormValue);

        }
    }


    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">


                <div className="flex items-center justify-center -mx-4">
                    <div className="w-full lg:w-1/2 px-4">
                        <div className="max-w-sm mx-auto lg:mr-0 lg:ml-auto">
                            <div className="mb-6 py-8 px-6 bg-white shadow rounded-t-3xl rounded-bl-3xl text-center">
                                <form onSubmit={FormSubmit} action="">
                                    <div className="mb-6">
                                        <span className="text-sm text-gray-400">Please login first.</span>
                                    
                                    </div>

                                    <input  value={FormValue.email} onChange={(e)=>{inputOnChange('email',e.target.value)}} className="mb-4 py-2 px-3 w-full bg-gray-50 rounded leading-loose" type="text" placeholder="User Name"/>
                                    <input  value={FormValue.email} onChange={(e)=>{inputOnChange('email',e.target.value)}} className="mb-4 py-2 px-3 w-full bg-gray-50 rounded leading-loose" type="text" placeholder="Password"/>


                                    <button type={"submit"} className="mb-4 py-4 w-full rounded text-sm bg-green-600 hover:bg-green-700 text-white font-bold leading-normal transition duration-200">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-center"/>
        </section>

    );
};

export default Contacts;