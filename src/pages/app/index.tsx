import { Inter } from 'next/font/google'
import Link from 'next/link'
import Button from '@mui/material/Button';
import BaseAppLayout from '@/layouts/baseAppLayout';
import { Typography } from '@mui/material';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <main>
        <BaseAppLayout>
          <Typography variant='h1'>Trash Cash Page</Typography>
          <Button variant='contained'>
            <Link href="/app/dashboard" >Navigate</Link>
          </Button>
        </BaseAppLayout>
      </main>
    </>
  )
}
