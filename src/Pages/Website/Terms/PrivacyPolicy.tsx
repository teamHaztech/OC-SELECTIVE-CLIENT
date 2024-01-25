import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  Link,
} from "@mui/material";

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 ,textAlign:"left"}}>
      <Paper elevation={3} sx={{ p: 6 }}>
        <Typography variant="h4" gutterBottom>
          Privacy Policy
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography paragraph>
          This Privacy Policy covers how your personal information is collected,
          utilized, and stated when you visit or make a purchase at{" "}
          <Link href="www.ocandselectiveonline.com.au">www.ocandselectiveonline.com.au</Link>{" "}
          (the "Site").
        </Typography>
        <Typography paragraph>
          Thank you for choosing OC and Selective Online for your online
          learning tests. We are committed to protecting your privacy and ensuring
          the security of your personal information. This Privacy Policy outlines
          how we collect, use, and safeguard your data when you visit our website
          and use our services.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}> 
          Information We Collect:
        </Typography>
        <Typography paragraph>
          a. <strong>Personal Information:</strong> When you register an account,
          we collect information such as your name, email address, and any other
          details you provide voluntarily. If you make a purchase, we may collect
          billing and shipping information to process your order.
        </Typography>
        <Typography paragraph>
          b. <strong>Payment Information:</strong> We use third-party payment
          processors, and we do not store any payment information on our servers.
          Your transactions are secured through encryption and adhere to industry
          standards.
        </Typography>
        <Typography paragraph>
          c. <strong>Usage Data:</strong> We may collect information about how
          you interact with our website, including pages visited, time spent on the
          site, and other analytics data.
        </Typography>
        <Typography paragraph>
          d. <strong>Cookies and Similar Technologies:</strong> We use cookies
          to enhance your browsing experience. You can manage cookie preferences
          through your browser settings.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          How We Use Your Information:
        </Typography>
        <Typography paragraph>
          a. <strong>Providing Services:</strong> We use your personal
          information to create and manage your account, process orders, and
          provide customer support.
        </Typography>
        <Typography paragraph>
          b. <strong>Communication:</strong> We may send you transactional emails
          related to your account, purchases, or updates. You can opt-out of
          non-essential communications.
        </Typography>
        <Typography paragraph>
          c. <strong>Improving Services:</strong> We analyze usage data to
          improve our website, services, and user experience.
        </Typography>
        <Typography paragraph>
          d. <strong>Legal Compliance:</strong> We may use your information to
          comply with applicable laws and regulations.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Data Security:
        </Typography>
        <Typography paragraph>
          a. We employ industry-standard security measures to protect your
          personal information from unauthorized access, disclosure, alteration,
          and destruction.
        </Typography>
        <Typography paragraph>
          b. Despite our best efforts, no online transmission or electronic
          storage is completely secure. You use our services at your own risk.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Third-Party Services:
        </Typography>
        <Typography paragraph>
          a. Our website may contain links to third-party websites or services.
          We are not responsible for the privacy practices or content of these
          third parties.
        </Typography>
        <Typography paragraph>
          b. We may use third-party tools for analytics, and their use is
          governed by their respective privacy policies.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Children's Privacy:
        </Typography>
        <Typography paragraph>
          a. Our services are not directed towards individuals under the age of
          6. We do not knowingly collect personal information from children.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Changes to Privacy Policy:
        </Typography>
        <Typography paragraph>
          a. We reserve the right to update this Privacy Policy. Any changes will
          be effective upon posting the revised policy on our website.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Contact Us:
        </Typography>
        <Typography paragraph>
          a. If you have any questions, concerns, or requests regarding your
          privacy, please contact us at{" "}
          <Link href="mailto:ocandselectiveonline.com.au@gmail.com">
            ocandselectiveonline.com.au@gmail.com
          </Link>.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          By using our website and services, you agree to the terms outlined in
          this Privacy Policy.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          OC and Selective Online Pty Ltd.
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;
