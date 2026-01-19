'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { authClient } from '../../lib/auth-client';

export default function Verify() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const [otp, setOtp] = useState('');
  const router = useRouter();
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setOtp(event.target.value);
  }
  useEffect(() => {
    if (!email) {
      router.push('/sign-up');
      // email not found redirect to sign-up page.....
    }
    // side effects should be in useEffect
  }, [email, router]);
  if (!email) {
    return null;
  }
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center gap-3">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Verify your email</CardTitle>
          <CardDescription>
            Enter the 6-digit code sent to you at {email}.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <Input
            type="text"
            autoComplete="one-time-code"
            inputMode="numeric"
            pattern="\d{6}"
            maxLength={6}
            required
            onChange={handleChange}
            value={otp}
          />
          <Button
            onClick={async () => {
              try {
                const { data } = await authClient.emailOtp.verifyEmail({
                  email,
                  otp,
                });
                if (data) router.push('/notes');
              } catch (error) {
                console.error(error);
              }
            }}
            className="w-full"
            variant="bluish"
          >
            Verify
          </Button>
          <Button
            onClick={async () => {
              await authClient.emailOtp.sendVerificationOtp({
                email,
                type: 'email-verification',
              });
            }}
            className="w-full"
            variant="secondary"
          >
            Resend OTP
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
