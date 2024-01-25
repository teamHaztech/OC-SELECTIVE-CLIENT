import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  Link,
} from "@mui/material";

const TermsAndConditions = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Acceptance of Terms
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography paragraph>
          By accessing or using our website and services, you acknowledge that
          you have read, understood, and agree to comply with these Terms and
          Conditions.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          User Accounts:
        </Typography>
        <Typography paragraph>
          You may need to create an account to access certain features of our
          services. You are responsible for maintaining the confidentiality of
          your account information and for all activities that occur under your
          account.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Use of Services:
        </Typography>
        <Typography paragraph>
          You agree to use our services for lawful purposes only and in
          accordance with these Terms and Conditions, as well as applicable
          laws and regulations.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Intellectual Property:
        </Typography>
        <Typography paragraph>
          All content, materials, and trademarks on our website are the property
          of [Your Company/Shop Name]. You may not use, reproduce, or
          distribute them without our explicit written permission.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Payments:
        </Typography>
        <Typography paragraph>
          You agree to pay all fees associated with the purchase of our online
          learning tests. Payment is processed through third-party payment
          processors, and you agree to their terms and conditions.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Refunds:
        </Typography>
        <Typography paragraph>
          Refund policies are outlined in our separate Refund Policy (hyperlink
          to Refund Policy). Please refer to that document for detailed
          information.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Prohibited Activities:
        </Typography>
        <Typography paragraph>
          You may not engage in any activities that violate applicable laws,
          infringe on the rights of others, or interfere with the operation of
          our services.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Privacy:
        </Typography>
        <Typography paragraph>
          Your use of our services is also governed by our Privacy Policy
          (hyperlink to Privacy Policy Page). Please review the policy to
          understand our practices regarding the collection and use of your
          personal information.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Termination:
        </Typography>
        <Typography paragraph>
          We reserve the right to terminate or suspend your account and access
          to our services at our sole discretion, without notice, for any
          reason, including a breach of these Terms and Conditions.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Limitation of Liability:
        </Typography>
        <Typography paragraph>
          OC and Selective Online Pty Ltd is not liable for any direct,
          indirect, incidental, consequential, or punitive damages arising out
          of your use of our services.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Changes to Terms:
        </Typography>
        <Typography paragraph>
          We reserve the right to update or modify these Terms and Conditions at
          any time. Changes will be effective upon posting the revised terms on
          our website.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          If you have any questions or concerns about these Terms and
          Conditions, please contact us at{" "}
          <Link href="mailto:ocandselectiveonline.com.au@gmail.com">
            ocandselectiveonline.com.au@gmail.com
          </Link>.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          Thank you for choosing OC and Selective Online Pty Ltd for your online
          learning tests.
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsAndConditions;
