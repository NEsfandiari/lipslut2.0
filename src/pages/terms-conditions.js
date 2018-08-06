import React, { Component } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem;
  animation: fadein 1s;
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`
class TermsConditions extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const terms = this.props.terms.map((term, i) => <p key={i}>{term}</p>)
    return <Container>{terms}</Container>
  }
}

TermsConditions.defaultProps = {
  terms: [
    'Terms & Conditions',
    'Thank you for visiting the Lipslut.com website! Your access to and use of this website is subject to the terms and conditions set forth below and the additional terms and conditions included elsewhere in this website, such as order forms and registration forms (collectively, “Terms and Conditions”). By using this website, the user (“user” or “you”) agrees to be bound by these Terms and Conditions.',
    '1. Ownership',
    'This website is owned by Lipslut, LLC, a California limited liability company (“Owner,” “we,” or “our”).',
    '2. Product Purchases',
    'All products purchased or made available through this website are for the personal use of the user placing the order, and may not be re-sold. We reserve the right, in our sole and absolute discretion, without notice, to reject, in whole or in part, any order placed through this website, for any reason whatsoever. Orders may be placed through this website only by persons who are over the age of 18, and each person placing an order hereby represents and warrants that he or she is over the age of 18. All orders are also subject to the terms and conditions of the purchase order form and the Commerce and Resale Policy.',
    '3. Website Information',
    'While we make reasonable efforts to keep the information and product availability on our website up-to-date, we make no representation or warranty that the information or product availability data is complete or accurate. We assume no responsibility arising from your use of any information on this website which may prove to be untimely or inaccurate, or for the non-availability of products described in this website.',
    '4. Intellectual Property Notices',
    'The content of this website constitutes the intellectual property of Owner or its licensors, and may be protected by laws related to trademarks, service marks, copyrights, patents, trade dress, and similar rights. Except as expressly permitted in these Terms and Conditions, any unauthorized use of this website or its contents without the express written consent of Owner is prohibited.',
    '5. User’s Representations and Warranties',
    'By using this website, the user represents and warrants that the user is 18 years of age or older, or, if a minor, is at least 13 years of age, has parental consent to visit this website, and the user’s parent has assumed responsibility to supervise the minor’s use of this website. A user who registers on this website represents that the user is 18 years of age or older. A registered user who permits another person to use his or her registration to this website agrees to pay for all products ordered or charges made by that other person.',
    '6. License',
    'A person who uses this website in accordance with these Terms and Conditions (an “authorized user”) is granted a revocable, limited, and non-exclusive license to access and to make any lawful personal use of this website. An authorized user may bookmark this website for his or her personal, non-commercial use. No user may link our website to another website without our prior written consent.',
    '7. Reuse of Content',
    'We maintain this website for the information, education, and entertainment of our users, and to communicate with our users to promote and provide information about our products, cosmetics and the beauty industry in general. The user is authorized to use the website for the user’s personal, non-commercial purposes. The reuse of the information or content contained in this website for any other purpose without the prior written consent of Owner is expressly prohibited.',
    '8. Misuse of Website',
    'You agree you will not misuse the website by doing any of the following:',
    'a) use the website to violate any applicable law, regulation, or ordinance, or to violate the rights of any other person;',
    'b) use the website or any of its content in connection with the dissemination of any indecent or obscene material;',
    'c) use the website for any commercial purpose other than obtaining the information contained in this website or for ordering goods or services made available through this website;',
    'd) monitor, track, copy, or otherwise obtain information about this website, its content, or its users by any process or data gathering and extraction software;',
    'e) take any action that would pose an undue burden or otherwise intentionally damage our infrastructure, or use our infrastructure to unduly or improperly burden or damage the infrastructure of another website, network, or computer system;',
    'f) access or disseminate any information that would constitute a violation of our Privacy Policy;',
    'g) engage in any other action which we, in our sole and absolute discretion, deem inappropriate or adverse to our interests; or',
    'h) violate these Terms and Conditions.',
    '9. Submissions',
    'All unsolicited submissions, suggestions, ideas, comments, formats, or information transmitted to us, whether solicited or unsolicited, becomes our property and may be used by us for any purpose, subject to the terms and conditions of our Privacy Policy. We shall have no obligation to pay you compensation with respect to our use of submitted material.',
    '10. Your Use of Website',
    'Your use of this website is at your own risk. This website and its content are provided “as-is,” without representation or warranty of any kind, either express or implied, including without limitation any implied warranties of use for a particular purpose or merchantability. We shall not be responsible or liable, under any theory of law or any circumstances, for any damages arising out of or in connection with your use of this website or of its content, regardless of any legal theory of liability, even if we have been given notice of the possibility of damages.',
    '11. Indemnification of Owner',
    'The user agrees to indemnify, defend, and hold harmless Owner and Owner’s agents, affiliates, and suppliers from any liability or loss of any kind relating to the user’s violations of these Terms and Conditions.',
    '12. Disputes',
    'Any dispute regarding this website or these Terms and Conditions will be governed by the laws of the State of California determined without reference to its principles of choice of law. Any controversy or claim related to this Agreement shall be settled by expedited arbitration in accordance with the expedited Rules of the American Arbitration Association ("AAA"), notwithstanding the amount in controversy, provided that:',
    'a) the legal and accounting fees incurred in connection with the arbitration by the prevailing party (as determined by the arbitrator) shall be paid by the other party;',
    'b) the selection of the arbitrator shall be made utilizing the “alternate strike method” from a panel of potential arbitrators provided by the AAA and consisting of not less than five (5) persons;',
    'c) the parties shall have the right of discovery, as provided in Section 1283.05 of the California Code of Civil Procedure;',
    'd) the arbitration shall take place at Los Angeles, California; and',
    'e) the parties agree that it is their mutual desire that any arbitration hereunder be consummated within 180 days of the assertion of a claim before the AAA.',
    '13. General',
    'a) These Terms and Conditions and any other terms and conditions set forth in the content of the website constitute the complete agreement between us regarding the use of the website and may not be altered or amended except in a writing signed by Owner.',
    'b) Owner reserves the right to modify and amend these Terms and Conditions, and any other terms and conditions set forth in the content of the website, at any time, with or without notice, in Owner’s sole and absolute discretion.',
    'c) Owner’s failure to enforce strictly the terms and conditions shall not constitute a waiver of our rights, and we may subsequently insist on strict enforcement of these Terms and Conditions.',
    'd) If any of the Terms and Conditions are determined to be unenforceable, the remaining Terms and Conditions shall remain in full force and effect.',
    '14. Images',
    'All images contained in the website are either our property or the property of others duly licensed to us. Any reproduction, copying, or dissemination of such images without our written permission or the written permission of the copyright owner is prohibited.',
    '15. Links',
    'We may provide links or references to websites maintained by third parties. While we take reasonable efforts to ensure that the content of such websites is of interest to our users and that the persons maintaining such websites have adopted appropriate procedures to protect their users’ privacy and the integrity of their systems, we make no representation or warranty regarding the content, information, or products made available on such other websites, the Privacy and Security Policies of these websites, and we shall not be responsible for any loss or damage arising from or related to the use of such websites.',
    '16. Testimonials',
    'Subject to our Privacy Policy, we reserve the right to use any communications you send to us in connection with our online and offline advertising and promotion campaigns, in all cases, without payment of compensation to you.',
    'If you have any questions regarding these Terms and Conditions, please contact us at hello.lipslut@gmail.com.',
    'Copyright © 2017 Lipslut™, LLC',
  ],
}

export default TermsConditions
