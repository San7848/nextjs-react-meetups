import Head from "next/head";

import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();
  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(enteredMeetupData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    console.log("RAW RESPONSE:", text);

    try {
      const data = JSON.parse(text);
      console.log(data);
    } catch {
      console.error("Not JSON:", text);
    }
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>React Meetups | Discover Developer Events</title>
        <meta
          name="description"
          content="React Meetups helps developers find, create, and join tech meetups across different cities."
        />
        <meta
          name="keywords"
          content="react, meetups, events, developers, tech community"
        />
        <meta name="author" content="Santosh Singh" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (for social sharing) */}
        <meta property="og:title" content="React Meetups" />
        <meta
          property="og:description"
          content="Join the best React and developer meetups near you."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/meetups-cover.png" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </>
  );
}
export default NewMeetupPage;
