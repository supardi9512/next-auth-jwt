import type { Metadata } from "next";
import Regist from "./register";

export const metadata: Metadata = {
    title: "Register | Next Auth JWT",
};

export default function Register() {
    return <div><Regist/></div>
}