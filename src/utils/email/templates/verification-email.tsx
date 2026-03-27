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
          <Heading style={heading}>Verifikasi Email Kamu</Heading>

          <Text style={paragraph}>Halo,</Text>

          <Text style={paragraph}>
            Terima kasih telah mendaftar di{" "}
            <strong style={{ color: "#F2A23A" }}>CIA 14</strong>. Untuk
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
            Email ini dikirim ke{" "}
            <strong style={{ color: "#F2A23A" }}>{email}</strong>. Jika kamu
            tidak mendaftar di CIA 14, abaikan email ini.
          </Text>

          <Text style={footer}>
            Link verifikasi akan kadaluarsa dalam 24 jam.
          </Text>

          <Text style={footerBrand}>Civil In Action 14</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default VerificationEmail;

const main = {
  backgroundColor: "#05101A",
  fontFamily:
    '"Poppins", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "#0C1F31",
  margin: "0 auto",
  padding: "40px 32px",
  maxWidth: "560px",
  borderRadius: "8px",
  border: "1px solid #1F4B66",
};

const heading = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  margin: "0 0 24px",
};

const paragraph = {
  color: "#e2e8f0",
  fontSize: "15px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const buttonContainer = {
  margin: "32px 0",
};

const button = {
  backgroundColor: "#F2A23A",
  borderRadius: "6px",
  color: "#05101A",
  fontSize: "15px",
  fontWeight: "700",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 28px",
};

const linkText = {
  margin: "0 0 16px",
  wordBreak: "break-all" as const,
};

const link = {
  color: "#BAA687",
  fontSize: "14px",
  lineHeight: "24px",
  textDecoration: "underline",
};

const hr = {
  borderColor: "#1F4B66",
  margin: "32px 0",
  opacity: 0.8,
};

const footer = {
  color: "#94a3b8",
  fontSize: "13px",
  lineHeight: "20px",
  margin: "0 0 8px",
};

const footerBrand = {
  color: "#BAA687",
  fontSize: "14px",
  fontWeight: "600",
  marginTop: "24px",
};
