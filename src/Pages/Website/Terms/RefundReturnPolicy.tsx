import React from "react";
import {
  Container,
  Typography,
  Paper,
  Divider,
  Box,
  Link,
} from "@mui/material";

const RefundReturnPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p:6 }}>
        <Typography variant="h4" gutterBottom>
          Refund and Return Policy
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Typography paragraph>
          Due to the nature of digital goods and the instant access provided to
          online learning tests, we generally do not offer refunds or returns.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Digital Goods:
        </Typography>
        <Typography paragraph>
          All our products are digital goods, including but not limited to
          online courses, tests, and study materials. Once a purchase is made
          and the digital goods are accessed, we are unable to accept returns or
          provide refunds.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Quality Assurance:
        </Typography>
        <Typography paragraph>
          We strive to provide high-quality learning materials and tests. In the
          event of technical issues or errors on our part, please contact our
          customer support within 7 working days of purchase, and we will make
          reasonable efforts to address and resolve the issue.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Cancellation:
        </Typography>
        <Typography paragraph>
          As our products are digital and accessible immediately upon purchase,
          cancellation requests are not applicable. All sales are final.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Customer Support:
        </Typography>
        <Typography paragraph>
          For any issues or concerns regarding the quality or accessibility of
          our digital goods, please contact our customer support at{" "}
          <Link href="mailto:ocandselectiveonline.com.au@gmail.com">
            ocandselectiveonline.com.au@gmail.com
          </Link>{" "}
          within the specified time frame.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Unauthorized Access:
        </Typography>
        <Typography paragraph>
          If you believe there has been unauthorized access to your account or
          if you suspect any fraudulent activity, please contact us immediately
          for assistance.
        </Typography>
        <Typography variant="h6" sx={{ mt: 2 }} fontWeight={"bold"}>
          Changes to Policy:
        </Typography>
        <Typography paragraph>
          We reserve the right to update or modify this Refund and Return Policy
          at any time. Changes will be effective upon posting the revised policy
          on our website.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          By purchasing our digital goods, you acknowledge and agree to the
          terms outlined in this Refund and Return Policy.
        </Typography>
        <Typography paragraph sx={{ mt: 2 }}>
          Thank you for choosing OC and Selective Online Pty Ltd for your online
          learning tests. If you have any questions, please contact us at{" "}
          <Link href="mailto:ocandselectiveonline.com.au@gmail.com">
            ocandselectiveonline.com.au@gmail.com
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
};

export default RefundReturnPolicy;
