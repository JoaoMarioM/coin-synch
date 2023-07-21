'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import Header from '@/components/Header';
import Button from '@/components/Button';
import { Carousel } from '@/components/Carousel';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { TableCryptos } from '@/components/TableCryptos';
import { FormSubscribe } from '@/components/Home/FormSubscribe';
import { Footer } from '@/components/Footer';
import { useCoins } from '@/hooks/coins';
import Modal from '@/components/Modal';
import SignInModal from '@/components/Modal/Signin';
import SignUpModal from '@/components/Modal/Signup';

export default function Home() {
  const [isSigninOpen, setIsSigninOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  return (
    <main className='min-h-screen'>
      <Modal
        isOpen={isSigninOpen}
        header={
          <h4 className='xl:h4 md:h5 sm:p'>
            Sign in <span className='text-primary-500 font-bold'>Coin</span>
            <span className='text-secondary-500 font-bold'>Synch</span>
          </h4>
        }
        onDismiss={setIsSigninOpen}
      >
        <SignInModal />
      </Modal>

      <Modal
        isOpen={isSignupOpen}
        header={
          <h4 className='xl:h4 md:h5 sm:p'>
            Sign in <span className='text-primary-500 font-bold'>Coin</span>
            <span className='text-secondary-500 font-bold'>Synch</span>
          </h4>
        }
        onDismiss={setIsSignupOpen}
      >
        <SignUpModal />
      </Modal>

      <Header
        hideShadow
        handleModalSignin={setIsSigninOpen}
        handleModalSignup={setIsSignupOpen}
      />

      <Container className='sm:mt-16'>
        <div className='xl:col-span-6 md:col-span-4 sm:col-span-4 flex flex-col gap-6 xl:pt-40 xl:pb-16 md:pt-16'>
          <h1 className='xl:h1 md:h3 sm:h5 sm:text-center md:text-start !font-bold !text-primary-500'>
            Lorem ipsum dolor sit amet, consectetur
          </h1>
          <h5 className='xl:h5 md:p sm:label sm:text-center md:text-start !text-default'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam,
            purus sit amet luctus venenatis, lectus magna fringilla urna,
            porttitor
          </h5>
          <Button
            suffix='arrow-right'
            className='xl:w-1/2 md:w-3/4 mt-2 xl:mb-14 mb-5'
          >
            SIGN UP NOW
          </Button>

          <div className='flex gap-8'>
            <h5 className='max:xl:p chip sm:small-label'>Cryptos</h5>
            <h5 className='max:xl:p chip sm:small-label'>NFTs</h5>
            <h5 className='max:xl:p chip sm:small-label'>Games</h5>
          </div>
        </div>

        <Carousel />
      </Container>

      <div className='w-full h-64'>
        <Image
          src='/waves.svg'
          alt='waves'
          fill
          className='!static object-cover object-center'
        />
      </div>

      <div id='about' className='bg-lg-white-contrast w-full sm:mt-14'>
        <Container className='xl:py-32 md:py-20 md:gap-10'>
          <div className='xl:col-span-7 md:col-span-8 sm:col-span-4 sm:mb-14 flex md:flex-wrap overflow-x-auto scroll-hidden gap-8 xl:order-1 order-2'>
            <Card
              iconName='bitcoin'
              title='For your company'
              subtitle='Crypto Solutions'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'
            />
            <Card
              iconName='crypto'
              title='For your company'
              subtitle='Crypto Solutions'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'
            />
            <Card
              className='ml-auto'
              iconName='increase-chart'
              title='For your company'
              subtitle='Crypto Solutions'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'
            />
            <Card
              iconName='laptop-mobile'
              title='For your company'
              subtitle='Crypto Solutions'
              text='Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam'
            />
          </div>

          <div className='xl:col-span-4 md:col-span-6 sm:col-span-4 md:col-start-2 self-center xl:order-2 order-1 max-xl:mb-10'>
            <h5 className='xl:h5 md:p !font-bold !text-primary-500 mb-1'>
              Lorem ipsum
            </h5>
            <h2 className='xl:h2 md:h3 !font-bold'>Lorem ipsum</h2>
            <p className='mt-4'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit ut
              aliquam, purus sit amet luctus venenatis, lectus magna fringilla
              urna, porttitor
            </p>
            <Button className='w-1/2 mt-10 hidden xl:visible'>
              Sign up now
            </Button>
          </div>
        </Container>
      </div>

      <Container id='top-cryptos' className='md:py-32 sm:py-14'>
        <h3 className='sm:h5 md:h3 col-span-full text-center !font-bold mb-12'>
          Top Cryptos
        </h3>
        {/* <div className="col-span-full flex flex-col gap-14">
            <div className="animate-pulse rounded w-full h-14 bg-secondary-200"></div>
            <div className="animate-pulse rounded w-full h-14 bg-secondary-200"></div>
            <div className="animate-pulse rounded w-full h-14 bg-secondary-200"></div>
          </div> */}
        <TableCryptos />
      </Container>

      <FormSubscribe />
      <Footer />
    </main>
  );
}
