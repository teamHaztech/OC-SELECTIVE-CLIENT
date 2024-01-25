import React from "react";
import Typography from "@mui/material/Typography";
import { Container,Divider,Paper, Stack } from "@mui/material";

const data = [
  {
    q: "What is the purpose of an online OC and Selective Tests shop?",
    ans: ` An online OC and Selective Tests shop provides resources and materials to help students prepare for
    Opportunity Class and Selective High School placement tests. It offers practice exams and other
    educational resources to support students in their preparation journey.`,
  },
  {
    q: "What types of materials are available in the online Portal?",
    ans: `The online shop offers a variety of materials, including practice test papers, topic wise resources and
    practice questions. These materials cover subjects such as mathematics, English, general ability, and
    other areas relevant to OC and Selective tests.`,
  },
  {
    q: "How can I access the materials after purchase?",
    ans: `Upon completing a purchase, customers typically receive instant access to online platforms where they
    can access the purchased resources.`,
  },
  {
    q: "Are the practice tests and materials aligned with OC and Selective test formats?",
    ans: `Yes, reputable online shops strive to create materials that closely resemble the format and content of
    official OC and Selective tests. This alignment ensures that students are prepared and allowed to
    practice only.`,
  },
  {
    q: "Can I get a refund if I am not satisfied with the purchased materials?",
    ans: `Due to the nature of digital goods and the instant access provided to online learning tests, we generally
    do not offer refunds or returns.`,
  },
  {
    q: "Are there different packages or bundles available for purchase?",
    ans: `Yes, online portal provides various packages or bundles, offering a combination of practice tests,
    additional resources at different price points. Customers can choose packages based on their specific
    needs and budget.`,
  },
  {
    q: "Is technical support available if I encounter issues with accessing the materials?",
    ans: `Yes, we have a dedicated customer support team that can assist with technical issues, access problems,
    or any other concerns related to purchased materials. Contact details for support are usually provided
    on the website.`,
  },
  {
    q: "How can I stay informed about updates, promotions, and new materials?",
    ans: `Customers can often subscribe to newsletters or follow the online shop's social media channels to stay
    informed about updates, promotions, and new releases. This ensures that they receive timely
    information about valuable resources and discounts.
    It's important for users to carefully review the specific FAQs and policies of the particular online OC and
    Selective Tests shop they are interested in to ensure accurate and up-to-date information.`,
  },
  {
    q: "What is the validity period of the purchased online test materials?",
    ans: `The validity period of online test materials varies based on the specific package or purchase. Typically,
    access to the purchased materials is available for a specific duration, such as 30 days, 60 days, or more.
    Customers will be informed about the validity period at the time of purchase.`,
  },
  {
    q: "Can I access the online tests after the expiration of the validity period?",
    ans: `No, access to online tests is generally restricted after the expiration of the validity period. It is important
    to complete the practice tests and review the materials within the specified timeframe. If additional
    access is required, customers may need to repurchase or explore extended access options offered by
    the online test provider.`,
  },
  {
    q: "Are there options to extend the validity of the online tests if needed?",
    ans: `Some online test provides offer options to extend the validity of purchased materials for an additional
    fee. It's advisable to check with customer support or review the terms and conditions to understand if
    extensions are available and the associated costs. Extensions are often subject to certain conditions and
    may need to be requested before the original validity period expires.`,
  },

];
const FAQ = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom marginBottom={1}>
          Frequently Asked Questions
        </Typography>
        <Divider sx={{ my: 2 }} />
        {data.map((item,key) => (
          <>
          <Stack flexDirection={"row"} columnGap={1}>
          <Typography variant="h6" gutterBottom fontWeight={"bold"} >
              {key+1+"."}
            </Typography>
          <Typography variant="h6" gutterBottom fontWeight={"bold"} >
              {item.q}
            </Typography>
          </Stack>
            
            <Typography marginBottom={2} marginLeft={3}>{""+item.ans}</Typography>
          </>
        ))}
      </Paper>
    </Container>
  );
};

export default FAQ;
