import type { Metadata } from "next";
import Login from "./login";

export const metadata: Metadata = {
    title: "Login | Next Auth JWT",
};

export default function Page() {
    return <div><Login/></div>
}