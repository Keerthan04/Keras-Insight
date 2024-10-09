import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const { message } = await request.json();
    console.log("Message received at the Next.js backend:", message);

    console.log("Attempting to connect to the Flask API...");
    console.log(JSON.stringify({ message }));
    // Fetch request to Flask API
    const backendResponse = await fetch(
      `${process.env.BACKEND_API_ENDPOINT}/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    // Check if Flask API response is OK
    if (!backendResponse.ok) {
      console.error("Error from Flask API, Status:", backendResponse.status);
      return NextResponse.json(
        { error: "Error connecting to Flask API" },
        { status: 500 }
      );
    }

    // Parse the response from Flask
    const data = await backendResponse.json();
    console.log("Data received from Flask API:", data);

    // Send the response back to the frontend
    return NextResponse.json({ response: data });
  } catch (error) {
    console.error("Error in Next.js backend:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
