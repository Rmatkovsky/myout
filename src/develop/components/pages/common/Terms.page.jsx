import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../constants/routes.constant';

class TermsPage extends Component {
    render() {
        return (
            <div className="container-fluid first-page">
                <div className="container terms__wrap">
                    <div className="terms__container">
                        <h1 className="terms__title">
                            Terms of Use Agreement<br /> of OutDoo, a product of Challenges, Inc.
                        </h1>

                        <div className="terms__section">
                            <p>
                                Effective as of: October 1, 2017
                            </p>
                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">1. General Conditions</span>
                            <p>
                                These Terms of Use (&quot;Terms&quot;) govern your access or use o f the OutDoo
                                application, OutDoo.me website, its contents, products, and services
                                (&quot;Services&quot;) made available, owned and controlled by CHALLENGES, INC. THESE
                                TERMS OF USE ARE EFFECTIVE AS OF October, 2017. YOUR USE OF THE SERVICES SIGNIFIES YOUR
                                ACCEPTANCE OF THESE TERMS OF USE AND CONSTITUTES A LEGALLY BINDING ACCEPTANCE OF THIS
                                AGREEMENT. IF YOU DO NOT AGREE TO THESE CONDITIONS YOU ARE NOT ALLOWED TO ACCESS OR USE
                                THE SERVICES.
                                PLEASE READ THESE TERMS CAREFULLY, BECAUSE THEY CONSTITUTE A LEGAL AGREEMENT BETWEEN
                                YOU AND CHALLENGES, INC. In these Terms, the words &quot;including&quot; and
                                &quot;include&quot; mean &quot;including, but not limited to.&quot;
                            </p>

                            <p>
                                By accessing/using the Services, you confirm your agreement to be bound by these Terms.
                                You may not access or use the Services If you do not agree to these Terms. These Terms
                                expressly supersede any prior agreements or arrangements of us with you. Challenges,
                                Inc. may terminate these Terms or any Services at any time with respect to you, or
                                generally cease offering or deny access to the Services or any portion thereof, at
                                any time for any reason.
                            </p>
                            <p>
                                IMPORTANT: YOU EXPRESSLY AGREE THAT ANY DISPUTES BETWEEN YOU AND CHALLENGES, INC. WILL
                                BE RESOLVED BY BINDING, INDIVIDUAL ARBITRATION AND YOU WAIVE YOUR RIGHT TO PARTICIPATE
                                IN A className ACTION LAWSUIT OR className-WIDE ARBITRATION EXCEPT IF YOU OPT-OUT OF
                                THE ARBITRATION BY NOTIFYING CHALLENGES, INC WITHIN 30 DAYS OF THE DATE THAT YOU
                                FIRST BECAME SUBJECT TO THIS ARBITRATION PROVISION, AND EXCEPT IN CERTAIN SITUATIONS
                                STATED IN THE ARBITRATION PROVISION BELOW.
                            </p>

                            <p>
                                SUPPLEMENTAL TERMS: Supplemental terms may apply to certain Services, such as Trophy or
                                any other particular event, program, activity or promotion, and such supplemental terms
                                will be disclosed to you in separate disclosures or in connection with the applicable
                                Service(s). Supplemental terms are in addition to, and shall be deemed a part of, the
                                Terms for the purposes of the applicable Service(s). Supplemental terms shall prevail
                                over these Terms in the event of a conflict with respect to the applicable Services.
                            </p>

                            <p>
                                AMENDMENTS: Challenges, Inc. may amend these Terms from time to time. Amendments will
                                be effective upon Challenges, Inc.&apos;s posting of such updated Terms at this location
                                or in the amended policies or supplemental terms on the applicable Service(s). Your
                                continued access or use of the Services after such posting confirms your consent to be
                                bound by the Terms, as amended. If Challenges, Inc. changes these Terms after the date
                                you first agreed to the Terms (or to any subsequent changes to these Terms), you may
                                reject any such change by providing Challenges, Inc. written notice of such rejection
                                within 30 days of the date such change became effective, as indicated in the
                                &quot;Effective&quot; date above. This written notice must be provided either (a) by
                                mail or hand delivery to our registered agent for service of process, c/o Challenges,
                                Inc. or (b) by email to: <a href="mailto:support@outdoo.me">support@outdoo.me</a>. In
                                order to be effective,
                                the notice must include your full name and clearly indicate your intent to reject
                                changes to these Terms. By rejecting changes, you are agreeing that you will continue
                                to be bound by the provisions of these Terms as of the date you first agreed to the
                                Terms (or to any subsequent changes to these Terms).
                            </p>

                            <p>
                                Challenges, Inc.&apos;s collection and use of personal information in connection with
                                the Services is described in Challenges, Inc.&apos;s Privacy Statement located under
                                this Terms and/or at <Link to={routes.main.privacy()}>privacy policy</Link>.
                            </p>
                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">2. Privacy Policy.</span>

                            <p>
                                Use of the Services is also governed by our Privacy Policy which is incorporated into
                                these Terms by this reference: <Link to={routes.main.privacy()}>privacy policy</Link>.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">3. Arbitration.</span>

                            <p>
                                BY AGREEING TO THE TERMS, YOU AGREE THAT YOU ARE REQUIRED TO RESOLVE ANY CLAIM THAT
                                YOU MAY HAVE AGAINST CHALLENGES, INC. ON AN INDIVIDUAL BASIS IN ARBITRATION, AS SET
                                FORTH IN THIS ARBITRATION AGREEMENT. THIS WILL PRECLUDE YOU FROM BRINGING ANY className,
                                COLLECTIVE, OR REPRESENTATIVE ACTION AGAINST CHALLENGES, INC., AND ALSO PRECLUDE YOU
                                FROM PARTICIPATING IN OR RECOVERING RELIEF UNDER ANY CURRENT OR FUTURE className,
                                COLLECTIVE, CONSOLIDATED, OR REPRESENTATIVE ACTION BROUGHT AGAINST CHALLENGES, INC.
                                BY SOMEONE ELSE.
                            </p>

                            <p>
                                Except if you opt-out or for disputes relating to: (1) your or Challenges, Inc.&apos;s
                                intellectual property (such as trademarks, domain names, trade secrets, copyrights and
                                patents); (2) violations of the API Terms, you agree that all disputes between you and
                                Challenges, Inc. (whether or not such dispute involves a third party) with regard to
                                your relationship with Challenges, Inc., including without limitation disputes related
                                to these Terms of Use, your use of the Service, and/or rights of privacy and/or
                                publicity, will be resolved by binding, individual arbitration under the American
                                Arbitration Association&apos;s rules for arbitration of consumer-related disputes and
                                you and Challenges, Inc. hereby expressly waive trial by jury. As an alternative, you
                                may bring your claim in your local &quot;small claims&quot; court, if permitted by that
                                small claims court&apos;s rules. You may bring claims only on your own behalf. Neither
                                you nor Challenges, Inc. will participate in a className action or className-wide
                                arbitration for any claims covered by this agreement. You also agree not to participate
                                in claims brought in a private attorney general or representative capacity, or
                                consolidated claims involving another person&apos;s account, if Challenges, Inc. is a
                                party to the proceeding. This dispute resolution provision will be governed by the
                                Federal
                                Arbitration Act. Any provision of applicable law notwithstanding, the arbitrator will
                                not have authority to award damages, remedies or awards that conflict with these Terms
                                of Use.
                            </p>

                            <p>
                                An Arbitrator&apos;s decision shall be final and binding on all parties. An
                                Arbitrator&apos;s decision and judgment thereon shall have no precedential or collateral
                                estoppel effect. If you prevail in arbitration you may be entitled to an award of
                                attorneys&apos; fees and expenses, to the extent provided under applicable law.
                                Challenges, Inc. may seek, and hereby does not waive any rights Challenges, Inc.
                                may have under applicable law to recover, attorneys&apos; fees and expenses if
                                Challenges, Inc. prevails in arbitration.
                            </p>

                            <p>
                                You may opt out of this agreement to arbitrate. If you do so, Challenges, Inc. cannot
                                require you to participate in an arbitration proceeding. To opt out, you must notify
                                us in writing within 30 days of the date that you first became subject to this
                                arbitration provision. To opt out, send a written statement to us at the address below
                                that includes your name and residence address, the email address you use for your OutDoo
                                account, or Facebook login and a clear statement that you want to opt out of this
                                arbitration agreement.
                            </p>

                            <p>
                                Challenges, Inc. ATTN: Arbitration Opt-out1810 E Sahara Avenue, Suite 214 Las Vegas,
                                Nevada 89104.
                            </p>

                            <p>
                                This arbitration agreement will survive the termination of your relationship with
                                Challenges, Inc.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">4. The Services</span>

                            <p>
                                The Service is comprised of OutDoo mobile application and its related services
                                (an &quot;Application&quot;), which enables users to challenge other users, to accept
                                challenges from other users, and nonusers, including with third party providers of such
                                challenges. Challenges can be created in the form of photos or videos. In certain
                                instances, the Services may also include trophies where there will be prizes for the
                                winners of various challenges that are created by the users or non-users. The trophies
                                can be created by the users, brands, celebrities and may be subject to additional terms
                                in addition to these Terms.
                            </p>

                            <p>License.</p>

                            <p>
                                Subject to your compliance with these Terms, Challenges, Inc. grants you a limited,
                                non- exclusive, non-sublicensable, revocable, non-transferable license to: (i) access
                                and use the Applications on your personal device solely in connection with your use of
                                the Services; and (ii) access and use any content, information and related materials
                                that may be made available through the Services, in each case solely for your personal,
                                noncommercial use. Any rights not expressly granted herein are reserved by Challenges,
                                Inc. and Challenges, Inc.&apos;s licensors.
                            </p>

                            <p>Restrictions.</p>

                            <p>
                                You may not: (i) remove any copyright, trademark or other proprietary notices from any
                                portion of the Services; (ii) reproduce, modify, prepare derivative works based upon,
                                distribute, license, lease, sell, resell, transfer, publicly display, publicly perform,
                                transmit, stream, broadcast or otherwise exploit the Services except as expressly
                                permitted by Challenges, Inc.; (iii) decompile, reverse engineer or disassemble the
                                Services except as may be permitted by applicable law; (iv) link to, mirror or frame
                                any portion of the Services; (v) cause or launch any programs or scripts for the purpose
                                of scraping, indexing, surveying, or otherwise data mining any portion of the Services
                                or unduly burdening or hindering the operation and/or functionality of any aspect of the
                                Services; or (vi) attempt to gain unauthorized access to or impair any aspect of the
                                Services or its related systems or networks.
                            </p>

                            <p>Third Party Services and Content.</p>

                            <p>
                                The Services may be made available or accessed in connection with third party services
                                and content (including advertising) that Challenges, Inc. does not control. You
                                acknowledge that different terms of use and privacy policies may apply to your use of
                                such third party services and content. Challenges, Inc. does not endorse such third
                                party services and content and in no event shall Challenges, Inc. be responsible or
                                liable for any products or services of such third party providers. Additionally, Apple
                                Inc., Google, Inc., Microsoft Corporation or BlackBerry Limited will be a third-party
                                beneficiary to this contract if you access the Services using Applications developed for
                                Apple iOS, Android, Microsoft Windows, or Blackberry-powered mobile devices,
                                respectively. These third party beneficiaries are not parties to this contract and are
                                not responsible for the provision or support of the Services in any manner. Your access
                                to the Services using these devices is subject to terms set forth in the applicable
                                third party beneficiary&apos;s terms of service.
                            </p>

                            <p>Ownership.</p>

                            <p>
                                The Services and all rights therein are and shall remain Challenges, Inc.&apos;s
                                property or the property of Challenges, Inc.&apos;s licensors. Neither these Terms nor
                                your use of the Services convey or grant to you any rights: (i) in or related to the
                                Services except for the limited license granted above; or (ii) to use or reference in
                                any manner Challenges, Inc.&apos;s company names, logos, product and service names,
                                trademarks or services marks or those of Challenges, Inc.&apos;s licensors.
                            </p>

                            <p>User Profile.</p>

                            <p>
                                In order to use the Services, you must register for and maintain an active personal user
                                Services account (&quot;Profile&quot;), which is linked with active Facebook, or email
                                account(s). Registration may require you to submit to Challenges, Inc. certain personal
                                information, such as your name, address, mobile phone number and age. For some services
                                such as Trophy, you may be required to submit at least one valid payment method
                                supported by Challenges, Inc. You agree to maintain accurate, complete, and up-to-date
                                information in your Account. Your failure to maintain accurate, complete, and up-to-date
                                Account information, including having an invalid or expired payment method on file, may
                                result in your inability to access or use the Services. You are responsible for all
                                activity that occurs under your Account, and you agree to maintain the security and
                                secrecy of your Account username and password at all times. Unless otherwise permitted
                                by Challenges, Inc. in writing, you may only possess one Account.
                            </p>

                            <p>User Requirements and Conduct.</p>

                            <p>
                                AGE RESTRICTIONS: Challenges, Inc. does not target the OutDoo.me website, OutDoo mobile
                                application, or its services to users under 13 years of age. There may be certain
                                access restrictions placed on any under 13 year-old users. You agree that if you assist
                                users under 13 years old to access the OutDoo.me website, OutDoo mobile application,
                                or its services, with your computer, internet enabled device, internet connection and/or
                                facilities (whether owned, leased or borrowed) that you will assume full liability for
                                any consequences and that UNDER NO CIRCUMSTANCES INCLUDING, BUT NOT LIMITED TO,
                                NEGLIGENCE NEITHER CHALLENGES, INC., ANY THIRD PARTY CONTENT PROVIDER NOR THEIR
                                RESPECTIVE AGENTS SHALL BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL OR
                                CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OF OR INABILITY TO USE THE SITE BY USERS
                                UNDER 13 YEARS OF AGE, EVEN IF SUCH PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
                                DAMAGES.
                            </p>

                            <p>Prohibited Content or Activities</p>

                            <p>
                                You are prohibited to create, accept, post or participate in creation or acceptance of
                                the following prohibit content. The following list is an example of prohibited content
                                and not an entire list of prohibited content. Challenges, Inc. reserves the right to
                                remove, block, or terminate any account that is associated with such prohibited content
                                or activities at any time without notice or liability to you. Prohibited content and
                                activities include, but not limited to any content or activity that is: (i) patently
                                offensive and promotes racism, bigotry, hatred, or physical harm of any kind against
                                any group or individual; (ii) harasses or provokes harassment of others; (iii) contains
                                a material that is or promotes sexuality or violence; (iv) contains nudity, violence,
                                or offensive subject matter; (v) contains a link to third party websites or applications
                                that are offensive, violent or adult websites; (vi) solicits personal information from
                                anyone under 18; (vii) provides personal information of individuals without their
                                expressed permission; (viii) knowingly promotes information that is false or misleading
                                or promotes illegal activities or conduct that is abusive, threatening, obscene,
                                defamatory, or libelous; (ix) transmits spams, or transmits or solicits
                                &quot;spamming&quot; or mass mailing; (x) furthers or promotes any criminal activity or
                                enterprise or provides instructional information about illegal activities including, but
                                not limited to making or buying illegal weapons, violating someone&apos;s privacy, or
                                providing or creating computer viruses; (xi) solicits passwords or personal-identifying
                                information for commercial or unlawful purposes from other Users;
                            </p>

                            <p>
                                CHALLENGES, INC. PROHIBITS USAGE OF ITS SERVICES IN A MANNER INCONSISTENT WITH ANY AND
                                ALL APPLICABLE LAWS. BY ACCESSING THE SERVICE, YOU AGREE THAT YOU WILL NOT ACCEPT OR
                                CREATE CHALLENGES, OR POST ANY MATERIAL OR ACTIVITY THAT IS CRIMINAL OR TORTIOUS IN
                                NATURE, INCLUDING BUT NOT LIMITED TO, CHILD PORNOGRAPHY, FRAUD, DRUG TRAFFICKING OR
                                DEALING, GAMBLING, SPAMMING, SENDING VIRUSES, USING OR TRANSMITTING OBSCENE MATERIALS,
                                PATENT AND COPYRIGHT INFRINGEMENTS OR TRADE SECRETS.
                            </p>

                            <p>Credits and Promotional Codes.</p>

                            <p>
                                Challenges, Inc. may, in its sole discretion, create referral and/or promotional codes
                                (&quot;Promo Codes&quot;) that may be redeemed for discounts on future Services and/or
                                a Third Party Provider&apos;s services, or may be used to create or accept challenges,
                                or other features or benefits related to the Services and/or a Third Party
                                Provider&apos;s services, subject to any additional terms that Challenges, Inc.
                                establishes. You agree that Promo Codes:
                                (i) must be used for the intended audience and purpose, and in a lawful manner; (ii)
                                may not be duplicated, sold or transferred in any manner, or made available to the
                                general public (whether posted to a public form or otherwise), unless expressly
                                permitted by Challenges, Inc.; (iii) may be disabled by Challenges, Inc. at any time
                                for any reason without liability to Challenges, Inc.; (iv) may only be used pursuant to
                                the specific terms that Challenges, Inc. establishes for such Promo Code; (v) are not
                                valid for cash; and (vi) may expire prior to your use. Challenges, Inc. reserves the
                                right to withhold or deduct credits or other features or benefits obtained through the
                                use of the referral system or Promo Codes by you or any other user in the event that
                                Challenges, Inc. determines or believes that the use of the referral system or use or
                                redemption of the Promo Code was in error, fraudulent, illegal, or otherwise in
                                violation of Challenges, Inc.&apos;s Terms.
                            </p>

                            <p>User Provided Content.</p>

                            <p>
                                Challenges, Inc. may, in its sole discretion, permit you from time to time create or
                                accept challenges, including trophy challenges, and may allow you to submit pictures,
                                videos, or other content (User Content) permitted by these terms and that are not
                                otherwise prohibited by law. Any User Content provided by you remains your property.
                                However, by providing User Content to Challenges, Inc., you grant Challenges, Inc. a
                                worldwide, perpetual, irrevocable, transferable license, with the right to use, copy,
                                modify, create derivative works of, distribute, sublicense, publicly perform, publicly
                                display, and otherwise exploit in any manner such User Content in all formats and
                                distribution channels now known or hereafter devised (including in connection with the
                                Services and Challenges, Inc.&apos;s business and on third-party sites and services),
                                without further notice to or consent from you, and without the requirement of payment
                                to you or any other person or entity.
                            </p>

                            <p>
                                You represent and warrant that: (i) you either are the sole and exclusive owner of all
                                User Content or you have all rights, licenses, consents and releases necessary to grant
                                Challenges, Inc. the license to the User Content as set forth above; and (ii) neither
                                the User Content, nor your submission, uploading, publishing or otherwise making
                                available of such User Content, nor Challenges, Inc.&apos;s use of the User Content as
                                permitted herein will infringe, misappropriate or violate a third party&apos;s
                                intellectual property or proprietary rights, or rights of publicity or privacy, or
                                result in the violation of any applicable law or regulation.
                            </p>

                            <p>
                                You agree to not provide User Content that is defamatory, libelous, hateful, violent,
                                obscene, pornographic, profane, unlawful, or otherwise offensive, as determined by
                                Challenges, Inc. in its sole discretion, whether or not such material may be protected
                                by law. Challenges, Inc. may, but shall not be obligated to, review, monitor, or remove
                                User Content, at Challenges, Inc.&apos;s sole discretion and at any time and for any
                                reason, without notice to you.
                            </p>

                            <p>Network Access and Devices.</p>

                            <p>
                                Obtaining the data network access necessary to use the Services are your sole
                                responsibility. Your mobile network&apos;s data and messaging rates and fees may apply
                                if you access or use the Services from your device. Acquiring and updating compatible
                                hardware or devices necessary to access and use the Services and Applications and any
                                updates thereto are your sole responsibility. Challenges, Inc. does not guarantee that
                                the Services, or any portion thereof, will function on any particular hardware or
                                devices. In addition, the Services may be subject to malfunctions and delays inherent
                                in the use of the Internet and electronic communications.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">5. Payment</span>

                            <p>
                                Downloading, accessing, or using OutDoo application or website is free of charge at the
                                meantime. However, you understand that use of the certain Services may result in charges
                                to you for the services you receive (&quot;Charges&quot;). Challenges, Inc. will receive
                                and/or enable your payment of the applicable Charges for services or goods obtained
                                through your use of the Services. Charges will be inclusive of applicable taxes where
                                required by law. Charges may include other applicable fees and/or surcharges including
                                a fee, or processing fees.
                            </p>

                            <p>
                                All Charges and payments will be enabled by Challenges, Inc. using the payment method
                                designated in your Account, after which you will receive a receipt by email. If your
                                primary Account payment method is determined to be expired, invalid or otherwise not
                                able to be charged, you agree that Challenges, Inc. may refuse the services to you.
                                Charges paid by you are final and non-refundable, unless otherwise determined by
                                Challenges, Inc.
                            </p>

                            <p>
                                Challenges, Inc. reserves the right to establish, remove and/or revise Charges for any
                                or all services or goods obtained through the use of the Services at any time in
                                Challenges, Inc.&apos;s sole discretion. Challenges, Inc. may from time to time provide
                                certain users with promotional offers and discounts that may result in different amounts
                                charged for the same or similar services or goods obtained through the use of the
                                Services, and you agree that such promotional offers and discounts, unless also made
                                available to you, shall have no bearing on your use of the Services or the Charges
                                applied to you.
                            </p>

                            <p>
                                In some cases, with respect to Third Party Providers, Charges you incur will be owed
                                directly to Third Party Providers, and Challenges, Inc. will collect payment of those
                                charges from you, on the Third Party Provider&apos;s behalf as their limited payment
                                collection agent, and payment of the Charges shall be considered the same as payment
                                made directly by you to the Third Party Provider.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">6. Disclaimers; Limitation of Liability;
                                Indemnification.</span>

                            <p>DISCLAIMERS.</p>

                            <p>
                                THE SERVICES, INCLUDING, WITHOUT LIMITATION, OUTDOO APPLICATION CONTENT IS PROVIDED ON
                                AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS. TO THE FULLEST EXTENT PERMITTED
                                BY LAW, CHALLENGES, INC., ITS DIRECTORS, MANAGERS, OR AGENTS DISCLAIM ALL
                                REPRESENTATIONS AND WARRANTIES, EXPRESS, IMPLIED, OR STATUTORY, NOT EXPRESSLY SET OUT IN
                                THESE TERMS, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
                                PARTICULAR PURPOSE, TITLE, QUIET ENJOYMENT, CUSTOM, TRADE, FREEDOM FROM COMPUTER VIRUS
                                AND NON-INFRINGEMENT. IN ADDITION, CHALLENGES, INC. MAKES NO REPRESENTATION, WARRANTY,
                                OR GUARANTEE REGARDING THE RELIABILITY, TIMELINESS, QUALITY, SUITABILITY, OR
                                AVAILABILITY OF THE SERVICES OR ANY SERVICES OR GOODS REQUESTED THROUGH THE USE OF THE
                                SERVICES, OR THAT THE SERVICES WILL BE
                                UNINTERRUPTED OR ERROR-FREE. CHALLENGES, INC DOES NOT GUARANTEE THE QUALITY,
                                SUITABILITY, SAFETY OR ABILITY OF THIRD PARTY PROVIDERS. YOU AGREE THAT THE ENTIRE RISK
                                ARISING OUT OF YOUR USE OF THE SERVICES, AND ANY SERVICE OR GOOD REQUESTED IN CONNECTION
                                THEREWITH, REMAINS SOLELY WITH YOU, TO THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE
                                LAW.
                            </p>

                            <p>
                                BY ACCESSING OR USING THE SERVICE YOU REPRESENT AND WARRANT THAT YOUR ACTIVITIES ARE
                                LAWFUL IN EVERY JURISDICTION WHERE YOU ACCESS OR USE THE SERVICE.
                            </p>

                            <p>
                                LIMITATION OF LIABILITY.
                            </p>

                            <p>
                                UNDER NO CIRCUMSTANCES SHALL CHALLENGES, INC., ITS OWNERS, DIRECTORS, MANAGERS OR AGENTS
                                BE LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, PUNITIVE, OR CONSEQUENTIAL
                                DAMAGES, INCLUDING LOST PROFITS, LOST DATA, PERSONAL INJURY, OR PROPERTY DAMAGE, OR
                                DAMAGES OF ANY KIND RELATED TO, IN CONNECTION WITH, OR OTHERWISE RESULTING FROM ANY USE
                                OF THE SERVICES, REGARDLESS OF THE NEGLIGENCE (EITHER ACTIVE, AFFIRMATIVE, SOLE, OR
                                CONCURRENT) OF CHALLENGES, INC., EVEN IF CHALLENGES, INC HAS BEEN ADVISED OF THE
                                POSSIBILITY OF SUCH DAMAGES.
                            </p>

                            <p>
                                UNDER NO CIRCUMSTANCES SHALL CHALLENGES, INC., ITS DIRECTORS, MANAGERS, OR AGENTS BE
                                LIABLE FOR ANY DAMAGES, LIABILITY OR LOSSES ARISING OUT OF: (i) YOUR USE OF OR RELIANCE
                                ON THE SERVICES OR YOUR INABILITY TO ACCESS OR USE THE SERVICES; OR (ii) ANY TRANSACTION
                                OR RELATIONSHIP BETWEEN YOU AND ANY THIRD PARTY PROVIDER, EVEN IF CHALLENGES, INC HAS
                                BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. CHALLENGES, INC. SHALL NOT BE LIABLE
                                FOR DELAY OR FAILURE IN PERFORMANCE RESULTING FROM CAUSES BEYOND CHALLENGES, INC.&apos;S
                                REASONABLE CONTROL.
                            </p>

                            <p>
                                YOU FURTHER AGREE THAT IN THE EVENT YOU INCUR ANY DAMAGES, LOSSES OR INJURIES THAT ARISE
                                OUT OF CHALLENGES, INC.&apos;S ACTS OR OMISSIONS, THE DAMAGES, IF ANY, CAUSED TO YOU ARE
                                NOT
                                IRREPARABLE OR SUFFICIENT TO ENTITLE YOU TO AN INJUNCTION PREVENTING ANY EXPLOITATION OF
                                ANY WEB SITE, SERVICE, PROPERTY, PRODUCT OR OTHER CONTENT OWNED OR CONTROLLED BY
                                CHALLENGES, INC., AND YOU WILL HAVE NO RIGHTS TO ENJOIN OR RESTRAIN THE DEVELOPMENT,
                                PRODUCTION, DISTRIBUTION, ADVERTISING, EXHIBITION OR EXPLOITATION OF ANY WEB SITE,
                                PROPERTY, PRODUCT, SERVICE, OR OTHER CONTENT OWNED OR CONTROLLED BY THE CHALLENGES, INC.
                            </p>

                            <p>
                                CHALLENGES, INC. IS NOT RESPONSIBLE FOR THE ACTIONS, CONTENT, INFORMATION, OR DATA OF
                                THIRD PARTIES, AND YOU RELEASE US, OUR DIRECTORS, OFFICERS, EMPLOYEES, AND AGENTS FROM
                                ANY CLAIMS AND DAMAGES, KNOWN AND UNKNOWN, ARISING OUT OF OR IN ANY WAY CONNECTED WITH
                                ANY CLAIM YOU HAVE AGAINST ANY SUCH THIRD PARTIES.
                            </p>

                            <p>
                                THE LIMITATIONS AND DISCLAIMERS IN THIS SECTION DO NOT PURPORT TO LIMIT LIABILITY OR
                                ALTER YOUR RIGHTS AS A CONSUMER THAT CANNOT BE EXCLUDED UNDER APPLICABLE LAW. BECAUSE
                                SOME STATES OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF OR THE LIMITATION OF
                                LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES, IN SUCH STATES OR JURISDICTIONS,
                                CHALLENGES, INC.&apos;S LIABILITY SHALL BE LIMITED TO THE EXTENT PERMITTED BY LAW. THIS
                                PROVISION SHALL HAVE NO EFFECT ON CHALLENGES, INC.&apos;S CHOICE OF LAW PROVISION SET
                                FORTH BELOW.
                            </p>

                            <p>INDEMNIFICATION.</p>

                            <p>
                                You agree to indemnify and hold Challenges, Inc. and its affiliates and their officers,
                                directors, employees, and agents harmless from any and all claims, demands, losses,
                                liabilities, and expenses, including attorneys&apos; fees, arising out of or in
                                connection
                                with: (i) your use of the Services or services or goods obtained through your use of the
                                Services; (ii) your breach or violation of any of these Terms; (iii) Challenges,
                                Inc.&apos;s use of your User Content; or (iv) your violation of the rights of any third
                                party, including Third Party Providers. You will cooperate as fully required by
                                Challenges, Inc. in the defense of any claim. Challenges, Inc. reserves the right to
                                assume the exclusive defense and control of any matter subject to indemnification by
                                you, and you will not in any event settle any claim without the prior written consent
                                of Challenges, Inc.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">7. Governing Law.</span>

                            <p>
                                These Terms are governed by and construed in accordance with the laws of the State of
                                Nevada, U.S.A., without giving effect to any conflict of law principles, except as may
                                be otherwise provided in the Arbitration Agreement above. For any action at law or in
                                equity relating to the arbitration provision of these Terms of Use, the Excluded
                                Disputes or if you opt out of the agreement to arbitrate, you agree to resolve any
                                dispute you have with Challenges, Inc. exclusively in a state or federal court located
                                in Clark County, Nevada, and to submit to the personal jurisdiction of the courts
                                located in Clark County for the purpose of litigating all such disputes.
                            </p>

                            <p>
                                The foregoing choice of law and forum selection provisions do not apply to the
                                arbitration clause in Section 2, to any arbitrable disputes as defined therein,
                                or for those who opt out of the Arbitration clause.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">8. Entire Agreement</span>

                            <p>
                                These Terms of Use constitute the entire agreement between you and Challenges, Inc. and
                                governs your use of the Service, superseding any prior agreements between you and
                                Challenges, Inc. You will not assign the Terms of Use or assign any rights or delegate
                                any obligations hereunder, in whole or in part, whether voluntarily or by operation of
                                law, without the prior written consent of Challenges, Inc. Any purported assignment or
                                delegation by you without the appropriate prior written consent of Challenges, Inc. will
                                be null and void. Challenges, Inc. may assign these Terms of Use or any rights hereunder
                                without your consent. If any provision of these Terms of Use is found by a court of
                                competent jurisdiction to be invalid or otherwise unenforceable, the parties
                                nevertheless agree that such portion will be deemed severable from these Terms of Use
                                and will not affect the validity and enforceability of the remaining provisions, and the
                                remaining provisions of the Terms of Use remain in full force and effect. Neither the
                                course of conduct between the parties nor trade practice will act to modify the Terms
                                of Use. These Terms of Use do not confer any third-party beneficiary rights.
                            </p>

                        </div>

                        <div className="terms__section">
                            <span className="terms__section-title">9. Territorial Restrictions</span>

                            <p>
                                The Service is not intended for distribution to, or use by any person or entity in any
                                jurisdiction or country where such distribution or use would be contrary to law or
                                regulation or which would subject Instagram to any registration requirement within such
                                jurisdiction or country. Challenges, Inc. reserves the right to limit the availability
                                of the Service or any portion of the Service, to any person, geographic area, or
                                jurisdiction, at any time and in our sole discretion, and to limit the quantities of any
                                content, program, product, service or other feature that Instagram provides.
                            </p>

                            <p>
                                Software related to or made available by the Service may be subject to United States
                                export controls. Thus, no software from the Service may be downloaded, exported or
                                re- exported: (i) into any country to which the United States has embargoed goods; or
                                (ii) to anyone on the U.S. Treasury Department&apos;s list of Specially Designated
                                Nationals or the U.S. Commerce Department&apos;s Table of Deny Orders. By downloading
                                any software related to the Service, you represent and warrant that you are not located
                                in, under the control of, or a national or resident of, any such country or on any
                                such list.
                            </p>

                            <p>
                                These Terms of Use is effective from September 1, 2017. These Terms of Use were written
                                in English (US). To the extent any translated version of these Terms of Use conflicts
                                with the English version, the English version controls.
                            </p>

                            <p>Contact information.</p>

                            <p>Email: <a href="mailto:support@outdoo.me">support@outdoo.me</a>.</p>

                            <p>
                                Mailing Address: Challenges, Inc. 5940 S Rainbow blvd. STE 400 #85022, Las Vegas, NV
                                89118-2507
                            </p>

                        </div>


                    </div>

                </div>
            </div>
        );
    }
}

export default TermsPage;
