import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface VerificationEmailProps {
  email: string;
  verificationUrl: string;
}

/**
 * Email template
 */
export const VerificationEmail = ({
  email,
  verificationUrl,
}: VerificationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Verifikasi email kamu untuk CIA 14</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoSection}>
            <Img
              src="https://civilinaction14th.com/images/Logo.webp"
              width="120"
              height="120"
              alt="CIA 14 Logo"
              style={logo}
            />
          </Section>

          <Heading style={heading}>Verifikasi Email Kamu</Heading>

          <Text style={paragraph}>Halo,</Text>

          <Text style={paragraph}>
            Terima kasih telah mendaftar di <strong>CIA 14</strong>. Untuk
            menyelesaikan pendaftaran, silakan verifikasi alamat email kamu
            dengan mengklik tombol di bawah ini:
          </Text>

          <Section style={buttonContainer}>
            <Button style={button} href={verificationUrl}>
              Verifikasi Email
            </Button>
          </Section>

          <Text style={paragraph}>
            Atau salin dan tempel link berikut di browser kamu:
          </Text>

          <Text style={linkText}>
            <Link href={verificationUrl} style={link}>
              {verificationUrl}
            </Link>
          </Text>

          <Hr style={hr} />

          <Text style={footer}>
            Email ini dikirim ke <strong>{email}</strong>. Jika kamu tidak
            mendaftar di CIA 14, abaikan email ini.
          </Text>

          <Text style={footer}>
            Link verifikasi akan kadaluarsa dalam 24 jam.
          </Text>

          <Text style={footerBrand}>CIA 14 - Civil In Action</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

const main = {
  backgroundColor: "#0a0a0a",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#1a1a1a",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "560px",
  borderRadius: "12px",
};

const logoSection = {
  textAlign: "center" as const,
  marginBottom: "24px",
};

const logo = {
  margin: "0 auto",
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  textAlign: "center" as const,
  margin: "0 0 24px",
};

const paragraph = {
  color: "#d1d5db",
  fontSize: "16px",
  lineHeight: "26px",
  margin: "0 0 16px",
};

const buttonContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#f59e0b",
  borderRadius: "8px",
  color: "#000000",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "14px 32px",
};

const linkText = {
  color: "#9ca3af",
  fontSize: "14px",
  lineHeight: "24px",
  wordBreak: "break-all" as const,
  margin: "0 0 16px",
};

const link = {
  color: "#f59e0b",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#374151",
  margin: "32px 0",
};

const footer = {
  color: "#6b7280",
  fontSize: "12px",
  lineHeight: "20px",
  margin: "0 0 8px",
  textAlign: "center" as const,
};

const footerBrand = {
  color: "#f59e0b",
  fontSize: "14px",
  fontWeight: "600",
  textAlign: "center" as const,
  marginTop: "16px",
};
