import { redirect } from "@sveltejs/kit";
import { getPath } from "$utils/page";

export const load = ({ locals }) => {
	console.log("hello world");
	throw redirect(307, getPath("/home"));
};
