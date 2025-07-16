import { redirect } from 'next/navigation';
import Image from 'next/image'
import Link from 'next/link'
import Header from './components/Header'
import Overpage from './dashboard/overview/page'
import WebPage from './website/page';


export default function Home() {
 return <WebPage/>
}
