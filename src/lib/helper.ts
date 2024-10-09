export async function generateResponse(message: string) {

    try {
        console.log("request reached to helper function \n")
        console.log("request to next backend done \n")
        const response = await fetch("/api/chatbackend", {//now in chat backend we are having
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ message }),
        });
        console.log("response from next backend got");
        const data = await response.json();
        console.log("response in helper got by backend is \n",data)
        if(data.error){
            
            throw new Error(message=data.error);
        }
        // return data.response['generation'];
        return data;
    } catch (error) {
        console.log("error found in helper",error);
        return {
            error: "Internal server Error",
        };
    }
    
}
