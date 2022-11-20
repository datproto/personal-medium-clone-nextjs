import type { NextPage } from 'next'
import Head from 'next/head'
// @ts-ignore
import { sanityClient, urlFor } from '../sanity'
import { Post } from '../typings'

import Header from '../components/Header'
import Link from "next/link";

interface Props {
  posts: [Post]
}

export default function Home({ posts }: Props) {
  return (
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Medium 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <div className="flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0">
        <div className="px-10 space-y-5">
          <h1 className="text-6xl max-w-xl font-serif">
            <span className="underline decoration-black decoration-4">Medium</span> is a place to write, read, and connect</h1>
          <h2 className="">
            It's easy and free to post your thinking on any topic and connect with millions of readers.
          </h2>
        </div>

        <img
          className="hidden md:inline-flex h-32 lg:h-full"
          src="https://accountabilitylab.org/wp-content/uploads/2020/03/Medium-logo.png" alt="logo"/>
      </div>

      {/* Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 p-2 md:p-6">
        {posts.map(p => (
          <Link key={p._id} href={`/post/${p.slug.current}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-200 ease-in-out"
                src={
                urlFor(p.mainImage).url()!
              } alt="post-image"/>
              <div className="flex justify-between p-5 bg-white">
                <div>
                  <p className="text-lg font-bold">{p.title}</p>
                  <p className="text-xs">{p.description} by {p.author.name}</p>
                </div>

                <img
                  className="h-12 w-12 rounded-full object-fit"
                  src={urlFor(p.author.image).url()!} alt=""/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const query = `
    *[_type == 'post'] {
      _id,
      author -> {
      name,
      image
    },
      mainImage,
      description,
      title,
      slug,
      body
    }
  `

  const posts = await sanityClient.fetch(query)

  return {
    props: {
      posts
    }
  }
}
