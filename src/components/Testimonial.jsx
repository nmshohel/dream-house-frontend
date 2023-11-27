import Contacts from "./Contact";

async function getData(){
    const res=await fetch(process.env.BASE_URL+"api/TestimonialList");
    if(!res.ok){
        throw new Error("Testimonial List Calling Fail");
    }
    return res.json();
}

const Testimonial = async () => {
    const data = await getData();
    return (
        <div>

        </div>
    );
};
export default Testimonial;