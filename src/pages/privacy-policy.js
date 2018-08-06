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
class PrivacyPolicy extends Component {
  componentDidMount() {
    this.props.resetSidebar()
  }
  render() {
    const policies = this.props.policies.map((policy, i) => (
      <p key={i}>{policy}</p>
    ))
    return <Container>{policies}</Container>
  }
}

PrivacyPolicy.defaultProps = {
  policies: [
    'Privacy Policy',
    'We respect our customers and their privacy. We have instituted this Privacy Policy to ensure that any personal information we obtain from you during your visit to our website is handled safely and responsibly. We have posted this Privacy Policy to let you know what kind of information we collect, how it is handled, with whom it may be shared, what choices you have regarding our use of your information and how you may access some of the data you provide to us. Your use of our website is subject to the Privacy Policy, as updated from time to time. This Privacy Policy does not apply to any information not obtained through our website. If you have any questions regarding this Privacy Policy, please contact us at hello.lipslut@gmail.com.',
    '1.  Personally Identifiable Information and its General Use',
    'We collect and store personal information in several ways at different parts of our website. The information we collect may include your name, email address, age, gender, address, telephone number, user ID, user password, order history, product preferences, current products used, and other identifying information. This allows us to keep a user profile so that we may customize your preferences. This makes it easier for you to submit information and inquiries to us and for us to provide the information, service, or products you desire.',
    'We may also request information in the online order forms for products and services. The order forms may request your shipping and mailing address, contact information, demographic information, method of payment and, if applicable, the information necessary to process the form of payment for your order, including account numbers.',
    'We may also collect information about you in surveys, promotions on our website, the searches you perform, and the pages you visit on our website. We may also monitor, on an anonymous aggregate basis, patterns of use on our website and the emails we send, including which links are clicked on in our email communications. We use this information to better personalize the content of our website and mailings to our users. We may also automatically collect your Internet Protocol address to help diagnose problems and for system administration. We may request additional information necessary to establish and maintain your account at our website. We may combine the information you provide with information we obtain from outside sources for our marketing purposes. All the information we collect during your visits will be protected and used in accordance with our Privacy Policy.',
    '2.  Specific Uses of Personally Identifiable Information',
    'The information we collect is used to customize your visit at our website. We show you content that we think will be interesting to you, and display content according to the preferences you indicate while on our website. We may use your information to send you promotional materials about us and our Partners (Partners include third parties with whom we have a retail, branding, marketing, or other business relationship or alliance). We may also use your information to contact you, if necessary. Our Partners have their own Privacy Policies which may differ from ours. You should review their Privacy Policies upon visiting their websites or providing personally identifiable information to them.',
    'We use your personally identifiable information to process orders. We may provide your personally identifiable information to the service providers we use to assist us in performing various functions relating to you order and your visit to our website. These include fulfillment houses, shippers, and technology support providers.',
    'From time to time, we may aggregate statistical information regarding our customers, traffic patterns and website usage, or sell our research, which may contain aggregate information. In addition, we may report aggregate information to our advertisers. Any aggregate information we collect or provide to third parties will not individually identify any user.',
    'We reserve the right to disclose any information if we determine such action is necessary (a) to comply with applicable law or to comply with legal process served on us; (b) to protect and defend the legal rights or property of Lipslut.com, our website, or its users; (c) to protect the health and safety of the users of our website, our customers, or the general public; and (d) for credit fraud protection.',
    'If we sell our business and website to a third party, the buyer will acquire the ownership of our website and the personally identifiable information you have provided to us.',
    'We may use non-personally identifiable and aggregate information for our internal business purposes and may share that information with others.',
    '3.  Disclosure of Personally Identifiable Information',
    'We use cookies and other tracking technology to collect passive and behavioral information about your visit to our website. This information may be linked to your personally identifiable information. “Cookies” are bits of electronic information that a website can transfer to a visitor’s hard drive to help tailor and keep records of visits to the website. Cookies allow website operators to better customize visits to the website to the visitor’s individual preferences. Our website uses cookies to keep track of what you have purchased. We also use cookies to deliver content specific to your interests, to save your password so you do not have to re-enter it each time you visit our website, and for other purposes relating to your transactions on the website. The use of cookies is standard on the Internet and many major websites use them to improve user experience. Although most web browsers automatically accept cookies, you can usually change your browser to prevent or notify you whenever you are sent a cookie. This gives you the chance to decide whether or not to accept it. Even without accepting a cookie, you can still access most of the features on our website. However, we also use cookies to track shopping cart items through the order and browsing process, so you will not be able to place an online order if you disable cookies. We may use tracking devices to gather information about your visit to our website to conduct tracking analysis.',
    '4.  Protection of Your Personal Privacy by Lipslut.com',
    'In all transactions with our visitors and customers, we employ reasonable and current Internet security methods and technologies. Where appropriate, we password protect, use encryption techniques and install firewalls. We strive to protect your privacy. For all our efforts to safeguard your privacy however, no system can be guaranteed foolproof or failsafe. We cannot ensure or warrant the security of any information that you transmit to us, or that we transmit to you, or guarantee that it will be free from unauthorized access by third parties. Once we receive your information, we use reasonable efforts to ensure its security on our systems.',
    '5.  Other Information You Should Know About Your Online Privacy',
    'The Lipslut website may contain links to or from other websites and advertising. The Privacy Policies of those websites and advertisers may significantly differ from those of our website. We are not responsible for the Privacy Practices or the content of those websites or for their Privacy Policies. It is your responsibility to contact such website operators or advertisers directly to determine their Privacy Policy.',
    '6.  Minors',
    'This website is not intended for children under the age of 13, and we do not knowingly collect or maintain information about them. While children under the age of 18 may browse the website, they may not register, provide information, or purchase our products.',
    '7.  Changes to This Privacy Policy',
    'We reserve the right to change or modify this Privacy Policy in our discretion at any time without individual notice to the users of our website. We will post the changed or modified Privacy Policy on our website as soon as practical as such changes or modifications are implemented. The Privacy Policy in effect at the time of the use of the information governs our right to use the information.',
    '8.  Business Exclusions',
    'This Privacy Policy does not apply to individuals acting solely in a business capacity and not for personal use.',
    '9.  Effective Date and Date of Update',
    'Lipslut.com has adopted this Privacy Policy effective August 23, 2017 and it was last updated on September, 2018.',
  ],
}

export default PrivacyPolicy
