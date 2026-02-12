import Head from "next/head";

import { MongoClient, ObjectId } from "mongodb";

import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props) {
  return (
    <>
      <Head>
        <title>{props.meetupData.title} | React Meetups</title>
        <meta name="description" content={props.meetupData.description} />
        <meta
          name="keywords"
          content="react, meetups, events, developers, tech community"
        />
        <meta name="author" content="Santosh Singh" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph (for social sharing) */}
        <meta property="og:title" content={props.meetupData.title} />
        <meta
          property="og:description"
          content={props.meetupData.description}
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={props.meetupData.image} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
      />
    </>
  );
}

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupCollection = db.collection("meetup");

  const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();

  client.close();

  return {
    fallback: false,
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  const db = client.db();
  const meetupCollection = db.collection("meetup");
  const selectedMeetup = await meetupCollection.findOne({
    _id: new ObjectId(meetupId),
  });

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description,
      },
    },
  };
}
export default MeetupDetails;
