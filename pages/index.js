import path from 'path'
import fs from 'fs'
import matter from 'gray-matter'
import Head from 'next/head'
import Post from '../components/Post'
import {sortByDate} from '../utils'

export default function Home({posts}) {

  return (
    <>
      <Head>
        <title>testowanie.fun</title>
      </Head>

      <div className='posts'>
        {posts.map((post,index)=>(
          <Post post={post}/>
        ))}
      </div>  
    </>
  )
}

export async function getStaticProps(){
  //get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  //get slug and frontmatter from posts
  const posts = files.map(filename =>{
  // Create slug
  const slug = filename.replace('.md', '')
  //get frontmatter
  const markdownWithMeta = fs.readFileSync(path.join('posts',
  filename), 'utf-8')

  const {data:frontmatter} = matter(markdownWithMeta)

  return{
    slug,
    frontmatter
  }
  })


  return{
    props:{
      posts: posts.sort(sortByDate),
    }
  }
}