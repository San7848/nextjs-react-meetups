import Head from "next/head";
import { MongoClient } from "mongodb";

import MeetupList from "../components/meetups/MeetupList";

function HomePage(props) {
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

      <MeetupList meetups={props.meetups} />
    </>
  );
}

// export async function getServerSideProps(context) {
//   const { req, res } = context;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  // fetch data from an API

  const client = await MongoClient.connect(process.env.MONGODB_URI);

  const db = client.db();
  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
