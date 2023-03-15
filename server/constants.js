const dayjs = require("dayjs");

module.exports.emailHtml = (body) => {
    return `<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
>
    <head>
        <!--[if (gte mso 9)|(IE)]>
            <xml>
                <o:OfficeDocumentSettings>
                    <o:AllowPNG />
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                </o:OfficeDocumentSettings>
            </xml>
        <![endif]-->
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- So that mobile will display zoomed in -->
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <!-- enable media queries for windows phone 8 -->
        <meta name="format-detection" content="telephone=no" />
        <!-- disable auto telephone linking in iOS -->
        <meta name="format-detection" content="date=no" />
        <!-- disable auto date linking in iOS -->
        <meta name="format-detection" content="address=no" />
        <!-- disable auto address linking in iOS -->
        <meta name="format-detection" content="email=no" />
        <!-- disable auto email linking in iOS -->
        <meta name="color-scheme" content="only" />
        <title></title>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
            href="https://fonts.googleapis.com/css2?family=Barlow:wght@100;200;300;400;500;600;700;800;900&family=Rubik:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
        />

        <style type="text/css">
            /*Basics*/
            body {
                margin: 0px !important;
                padding: 0px !important;
                display: block !important;
                min-width: 100% !important;
                width: 100% !important;
                -webkit-text-size-adjust: none;
            }
            table {
                border-spacing: 0;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
            }
            table td {
                border-collapse: collapse;
                mso-line-height-rule: exactly;
            }
            td img {
                -ms-interpolation-mode: bicubic;
                width: auto;
                max-width: auto;
                height: auto;
                margin: auto;
                display: block !important;
                border: 0px;
            }
            td p {
                margin: 0;
                padding: 0;
            }
            td div {
                margin: 0;
                padding: 0;
            }
            td a {
                text-decoration: none;
                color: inherit;
            }
            /*Outlook*/
            .ExternalClass {
                width: 100%;
            }
            .ExternalClass,
            .ExternalClass p,
            .ExternalClass span,
            .ExternalClass font,
            .ExternalClass td,
            .ExternalClass div {
                line-height: inherit;
            }
            .ReadMsgBody {
                width: 100%;
                background-color: #ffffff;
            }
            /* iOS BLUE LINKS */
            a[x-apple-data-detectors] {
                color: inherit !important;
                text-decoration: none !important;
                font-size: inherit !important;
                font-family: inherit !important;
                font-weight: inherit !important;
                line-height: inherit !important;
            }
            /*Gmail blue links*/
            u + #body a {
                color: inherit;
                text-decoration: none;
                font-size: inherit;
                font-family: inherit;
                font-weight: inherit;
                line-height: inherit;
            }
            /*Buttons fix*/
            .undoreset a,
            .undoreset a:hover {
                text-decoration: none !important;
            }
            .yshortcuts a {
                border-bottom: none !important;
            }
            .ios-footer a {
                color: #aaaaaa !important;
                text-decoration: none;
            }
            /* data-outer-table="800 - 600" */
            .outer-table {
                width: 640px !important;
                max-width: 640px !important;
            }
            /* data-inner-table="780 - 540" */
            .inner-table {
                width: 580px !important;
                max-width: 580px !important;
            }
            /*Responsive-Tablet*/
            @media only screen and (max-width: 799px) and (min-width: 601px) {
                .outer-table.row {
                    width: 640px !important;
                    max-width: 640px !important;
                }
                .inner-table.row {
                    width: 580px !important;
                    max-width: 580px !important;
                }
            }
            /*Responsive-Mobile*/
            @media only screen and (max-width: 600px) and (min-width: 320px) {
                table.row {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                td.row {
                    width: 100% !important;
                    max-width: 100% !important;
                }
                .img-responsive img {
                    width: 100% !important;
                    max-width: 100% !important;
                    height: auto !important;
                    margin: auto;
                }
                .center-float {
                    float: none !important;
                    margin: auto !important;
                }
                .center-text {
                    text-align: center !important;
                }
                .container-padding {
                    width: 100% !important;
                    padding-left: 15px !important;
                    padding-right: 15px !important;
                }
                .container-padding10 {
                    width: 100% !important;
                    padding-left: 10px !important;
                    padding-right: 10px !important;
                }
                .hide-mobile {
                    display: none !important;
                }
                .menu-container {
                    text-align: center !important;
                }
                .autoheight {
                    height: auto !important;
                }
                .m-padding-10 {
                    margin: 10px 0 !important;
                }
                .m-padding-15 {
                    margin: 15px 0 !important;
                }
                .m-padding-20 {
                    margin: 20px 0 !important;
                }
                .m-padding-30 {
                    margin: 30px 0 !important;
                }
                .m-padding-40 {
                    margin: 40px 0 !important;
                }
                .m-padding-50 {
                    margin: 50px 0 !important;
                }
                .m-padding-60 {
                    margin: 60px 0 !important;
                }
                .m-padding-top10 {
                    margin: 30px 0 0 0 !important;
                }
                .m-padding-top15 {
                    margin: 15px 0 0 0 !important;
                }
                .m-padding-top20 {
                    margin: 20px 0 0 0 !important;
                }
                .m-padding-top30 {
                    margin: 30px 0 0 0 !important;
                }
                .m-padding-top40 {
                    margin: 40px 0 0 0 !important;
                }
                .m-padding-top50 {
                    margin: 50px 0 0 0 !important;
                }
                .m-padding-top60 {
                    margin: 60px 0 0 0 !important;
                }
                .m-height10 {
                    font-size: 10px !important;
                    line-height: 10px !important;
                    height: 10px !important;
                }
                .m-height15 {
                    font-size: 15px !important;
                    line-height: 15px !important;
                    height: 15px !important;
                }
                .m-height20 {
                    font-size: 20px !important;
                    line-height: 20px !important;
                    height: 20px !important;
                }
                .m-height25 {
                    font-size: 25px !important;
                    line-height: 25px !important;
                    height: 25px !important;
                }
                .m-height30 {
                    font-size: 30px !important;
                    line-height: 30px !important;
                    height: 30px !important;
                }
                .radius6 {
                    border-radius: 6px !important;
                }
                .fade-white {
                    background-color: rgba(255, 255, 255, 0.8) !important;
                }
                .rwd-on-mobile {
                    display: inline-block !important;
                    padding: 5px !important;
                }
                .center-on-mobile {
                    text-align: center !important;
                }
                .rwd-col {
                    width: 100% !important;
                    max-width: 100% !important;
                    display: inline-block !important;
                }
            }
        </style>
        <style type="text/css" class="export-delete">
            .thead {
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                /* width: 100%; */
                background: linear-gradient(
                    90deg,
                    rgba(66, 68, 70, 1) 0%,
                    rgba(41, 35, 36, 1) 40%,
                    rgba(15, 0, 0, 1) 75%
                );
                padding: 1rem;
            }
            .tfoot {
                padding: 20px;
                background-color: #cccccc;
                /* background: rgb(66, 68, 70); */
                background: linear-gradient(
                    90deg,
                    rgba(66, 68, 70, 1) 0%,
                    rgba(41, 35, 36, 1) 40%,
                    rgba(15, 0, 0, 1) 75%
                );
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border: 0px;
                align: center;
                width: 100%;
            }
            .composer--mobile table.row {
                width: 100% !important;
                max-width: 100% !important;
            }
            .composer--mobile td.row {
                width: 100% !important;
                max-width: 100% !important;
            }
            .composer--mobile .img-responsive img {
                width: 100% !important;
                max-width: 100% !important;
                height: auto !important;
                margin: auto;
            }
            .composer--mobile .center-float {
                float: none !important;
                margin: auto !important;
            }
            .composer--mobile .center-text {
                text-align: center !important;
            }
            .composer--mobile .container-padding {
                width: 100% !important;
                padding-left: 15px !important;
                padding-right: 15px !important;
            }
            .composer--mobile .container-padding10 {
                width: 100% !important;
                padding-left: 10px !important;
                padding-right: 10px !important;
            }
            .composer--mobile .hide-mobile {
                display: none !important;
            }
            .composer--mobile .menu-container {
                text-align: center !important;
            }
            .composer--mobile .autoheight {
                height: auto !important;
            }
            .composer--mobile .m-padding-10 {
                margin: 10px 0 !important;
            }
            .composer--mobile .m-padding-15 {
                margin: 15px 0 !important;
            }
            .composer--mobile .m-padding-20 {
                margin: 20px 0 !important;
            }
            .composer--mobile .m-padding-30 {
                margin: 30px 0 !important;
            }
            .composer--mobile .m-padding-40 {
                margin: 40px 0 !important;
            }
            .composer--mobile .m-padding-50 {
                margin: 50px 0 !important;
            }
            .composer--mobile .m-padding-60 {
                margin: 60px 0 !important;
            }
            .composer--mobile .m-padding-top10 {
                margin: 30px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top15 {
                margin: 15px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top20 {
                margin: 20px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top30 {
                margin: 30px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top40 {
                margin: 40px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top50 {
                margin: 50px 0 0 0 !important;
            }
            .composer--mobile .m-padding-top60 {
                margin: 60px 0 0 0 !important;
            }
            .composer--mobile .m-height10 {
                font-size: 10px !important;
                line-height: 10px !important;
                height: 10px !important;
            }
            .composer--mobile .m-height15 {
                font-size: 15px !important;
                line-height: 15px !important;
                height: 15px !important;
            }
            .composer--mobile .m-height20 {
                font-srobotoize: 20px !important;
                line-height: 20px !important;
                height: 20px !important;
            }
            .composer--mobile .m-height25 {
                font-size: 25px !important;
                line-height: 25px !important;
                height: 25px !important;
            }
            .composer--mobile .m-height30 {
                font-size: 30px !important;
                line-height: 30px !important;
                height: 30px !important;
            }
            .composer--mobile .radius6 {
                border-radius: 6px !important;
            }
            .composer--mobile .fade-white {
                background-color: rgba(255, 255, 255, 0.8) !important;
            }
            .composer--mobile .rwd-on-mobile {
                display: inline-block !important;
                padding: 5px !important;
            }
            .composer--mobile .center-on-mobile {
                text-align: center !important;
            }
            .composer--mobile .rwd-col {
                width: 100% !important;
                max-width: 100% !important;
                display: inline-block !important;
            }
        </style>
    </head>

    <body
        data-bgcolor="Body"
        style="
            margin-top: 0;
            margin-bottom: 0;
            padding-top: 0;
            padding-bottom: 0;
            width: 100%;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        "
        bgcolor="#FFFFFF"
    >
        <span
            class="preheader-text"
            data-preheader-text
            style="
                color: transparent;
                height: 0;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                visibility: hidden;
                width: 0;
                display: none;
                mso-hide: all;
            "
        ></span>

        <!-- Preheader white space hack -->
        <div style="display: none; max-height: 0px; overflow: hidden">
            &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
        </div>

        <div
            data-primary-font="Barlow"
            data-secondary-font="Rubik"
            style="
                display: none;
                font-size: 0px;
                line-height: 0px;
                max-height: 0px;
                max-width: 0px;
                opacity: 0;
                overflow: hidden;
                visibility: hidden;
                mso-hide: all;
            "
        ></div>

        <table
            border="0"
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="width: 100%; max-width: 100%"
        >
            
            ${body}
            <tr>
                <!-- Outer Table -->
                <td align="center" data-bgcolor="Body" bgcolor="#FFFFFF" data-composer>
                    <table class="tfoot">
                        <tr>
                            <td align="center" data-border-color="Footer Border Color" class="container-padding">
                                <table
                                    border="0"
                                    align="center"
                                    cellpadding="0"
                                    cellspacing="0"
                                    role="presentation"
                                    class="row"
                                    width="520"
                                    style="width: 520px; max-width: 520px"
                                >
                                    <tr data-element="blue-footer-paragraphs" data-label="Paragraphs">
                                        <td align="center">
                                            <table
                                                border="0"
                                                align="center"
                                                cellpadding="0"
                                                cellspacing="0"
                                                role="presentation"
                                                class="row"
                                                width="480"
                                                style="width: 480px; max-width: 480px"
                                            >
                                                <tr>
                                                    <td
                                                        class="center-text"
                                                        data-text-style="Paragraphs"
                                                        align="center"
                                                        style="
                                                            font-family: 'Barlow', Arial, Helvetica, sans-serif;
                                                            font-size: 14px;
                                                            line-height: 24px;
                                                            font-weight: 300;
                                                            font-style: normal;
                                                            color: #fff;
                                                            text-decoration: none;
                                                            letter-spacing: 0px;
                                                        "
                                                    >
                                                        <multiline>
                                                            <div mc:edit data-text-edit>
                                                                ${dayjs().year()} ${process.env.APP_NAME}. All Rights
                                                                Reserved.<br />
                                                            </div>
                                                        </multiline>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr data-element="blue-footer-paragraphs" data-label="Paragraphs">
                                        <td
                                            height="40"
                                            style="font-size: 40px; line-height: 40px"
                                            data-height="Spacing above tags"
                                        >
                                            &nbsp;
                                        </td>
                                    </tr>
                                </table>
                                <!-- Content -->
                            </td>
                        </tr>

                        <tr>
                            <td style="color: #fff; padding-left: 10%; padding-right: 10%">
                                <singleline>
                                    <div>
                                        <i
                                            >"Disclaimer: This email and any attachments are intended solely for the use
                                            of the individual or entity to whom it is addressed and may contain
                                            confidential and/or privileged information. If you have received this email
                                            in error, please notify the sender immediately and delete this email from
                                            your system. Any unauthorized review, use, disclosure, or distribution is
                                            strictly prohibited. ${process.env.VITE_APP_NAME} cars auction is not
                                            responsible for any errors or omissions in the content of this email or for
                                            any actions taken in reliance upon this email."
                                        </i>
                                    </div>
                                </singleline>
                            </td>
                        </tr>
                        <!-- blue-footer -->
                    </table>
                </td>
            </tr>
            <!-- Outer-Table -->
        </table>
    </body>
</html>
`;
};

module.exports.welcomeEmailBody = (opts) => {
    const { receiverEmail, receiverName, receiverPassword, applicationName } = opts || {};
    return `<body>
    <p>Dear ${receiverName},</p>
    <p>
        We're thrilled to welcome you to ${applicationName}! Thank you for choosing to join our community.
        We are confident that you will love using our app.
    </p>
    <p>
        As a new user, you might have a few questions about how everything works. Rest assured, our team is
        always here to help you out. If you have any questions or concerns, don't hesitate to reach out to
        us via email or through the support chat.
    </p>
    <p>Here are a few things you can do now to get started:</p>
    <ul>
        <li>
            Explore the app: Take a few minutes to explore the different features and functionalities of our
            app. We have designed it to be user-friendly and intuitive, so you should have no trouble
            finding your way around.
        </li>
        <li>
            Customize your profile: Your profile is your digital identity on our app. Add a profile picture,
            update your bio, and let other users know a bit more about you.
        </li>
        <li>
            Connect with other users: Our app is a social platform, so feel free to connect with other users
            who share your interests. You can join groups, follow other users, and interact with them
            through comments and messages.
        </li>
    </ul>
    <p>
        Thank you once again for choosing to use ${applicationName}. We are excited to have you on board and
        look forward to seeing you thrive on our app.
    </p>
    <p>Please use these credentials to login into the system:</p>
    <ul>
        <li>email: ${receiverEmail}</li>
        <li>password: ${receiverPassword}</li>
    </ul>
    <p>
        Best regards,
        ${applicationName} Team
    </p>
</body>`;
};
