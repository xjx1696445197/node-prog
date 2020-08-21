<template>
    <div class="page">
        <div class="HEADER_WALLET">
            <div class="HEADER_BACK" @click="this.$back"></div>
            <p class="HEADER_TITLE_WALLET">隐私政策</p>
        </div>
        <div class="wrapper">
            <div class="agree_wrapper">
                <div class="content" v-if="curLang">

                    <!--隐私协议-->
                    <p class="agree_txt1 agreement_padding fb">《Halle隐私政策》</p>
                    <p class="agree_txt3 agree_margin">最近更新于：2019年08月17日</p>
                    <p class="agree_txt3 agree_margin">尊敬的用户：</p>
                    <p class="agree_txt3 font-weight agree_margin">Halle INTERNATIONAL FOUNDATION.（以下简称“Halle”或“我们”）尊重并保护用户（以下简称“您”或“用户”）的隐私，您使用Halle时，Halle将按照本隐私政策（以下简称“本政策”）收集、使用您的个人信息。</p>
                    <p class="agree_txt2 agree_margin1 fb">Halle建议您在使用本产品（以下简称“Halle”）之前仔细阅读并理解本政策全部内容, 针对免责声明等条款在内的重要信息将以加粗的形式体现。本政策有关关键词定义与《Halle服务协议》保持一致。</p>
                    <p class="agree_txt2 agree_margin1 fb">本政策可由Halle在线随时更新，更新后的政策一旦公布即代替原来的政策，如果您不接受修改后的条款，请立即停止使用Halle，您继续使用Halle将被视为接受修改后的政策。经修改的政策一经在Halle上公布，立即自动生效。</p>
                    <p class="agree_txt2 agree_margin1 fb">您知悉本政策及其他有关规定适用于Halle及Halle上Halle所自主拥有的DApp。</p>


                    <p class="agree_txt3 agree_margin">一、 我们收集您的哪些信息</p>
                    <p class="agree_txt2 agree_margin1 fb">请您知悉，我们收集您的以下信息是出于满足您在Halle服务需要的目的，且我们十分重视对您隐私的保护。在我们收集您的信息时，将严格遵守“合法、正当、必要”的原则。且您知悉，若您不提供我们服务所需的相关信息，您在Halle的服务体验可能因此而受到影响。</p>
                    <p class="agree_txt2 agree_margin1">1. 我们将收集您的移动设备信息、操作记录、交易记录、钱包地址等个人信息。</p>
                    <p class="agree_txt2 agree_margin1">2. 为满足您的特定服务需求，我们将可能收集您的姓名、银行卡号、手机号码、邮件地址等信息。</p>
                    <p class="agree_txt2 agree_margin1 fb">3. 您知悉：您在Halle 上的钱包密码、私钥、助记词有些并不存储或同步至服务器。Halle不提供找回您的钱包密码、私钥、助记词的服务。</p>
                    <p class="agree_txt2 agree_margin1">4. 除上述内容之外，您知悉在您使用Halle特定功能时，我们将在收集您的个人信息前向您作出特别提示，要求向您收集更多的个人信息。如您选择不同意，则视为您放弃使用Halle该特定功能。</p>
                    <p class="agree_txt2 agree_margin1 fb">5. 当您跳转到第三方DApp后，第三方DApp会向您收集个人信息。Halle不持有第三方DApp向您收集的个人信息。</p>
                    <p class="agree_txt2 agree_margin1 fb">6. 在法律法规允许的范围内，Halle可能会在以下情形中收集并使用您的个人信息无需征得您的授权同意：</p>
                    <p class="agree_txt2 agree_margin1 fb">（1） 与国家安全、国防安全有关的；</p>
                    <p class="agree_txt2 agree_margin1 fb">（2） 与公共安全、公共卫生、重大公共利益有关的；</p>
                    <p class="agree_txt2 agree_margin1 fb">（3） 与犯罪侦查、起诉、审判和判决执行等有关的；</p>
                    <p class="agree_txt2 agree_margin1 fb">（4） 所收集的个人信息是您自行向社会公众公开的；</p>
                    <p class="agree_txt2 agree_margin1 fb">（5） 从合法公开披露的信息中收集您的个人信息，如合法的新闻报道，政府信息公开等渠道；</p>
                    <p class="agree_txt2 agree_margin1 fb">（6） 用于维护服务的安全和合规所必需的，例如发现、处理产品和服务的故障；</p>
                    <p class="agree_txt2 agree_margin1 fb">（7） 法律法规规定的其他情形。</p>
                    <p class="agree_txt2 agree_margin1">7. 我们收集信息的方式如下：</p>
                    <p class="agree_txt2 agree_margin1">（1） 您向我们提供信息。例如，您在“个人中心”页面中填写姓名、手机号码或银行卡号，或在反馈问题时提供邮件地址，或在使用我们的特定服务时，您额外向我们提供。</p>
                    <p class="agree_txt2 agree_margin1">（2） 我们在您使用Halle的过程中获取信息，包括您移动设备信息以及您对Halle的操作记录等信息；</p>
                    <p class="agree_txt2 agree_margin1">（3） 我们通过区块链系统，拷贝您全部或部分的交易记录。但交易记录以区块链系统的记载为准。</p>



                    <p class="agree_txt3 agree_margin">二、 我们如何使用您的信息</p>
                    <p class="agree_txt2 agree_margin1">1. 我们通过您移动设备的唯一序列号，确认您与您的钱包的对应关系。</p>
                    <p class="agree_txt2 agree_margin1">2. 我们将向您及时发送重要通知，如软件更新、服务协议及本政策条款的变更。</p>
                    <p class="agree_txt2 agree_margin1">3. 我们通过收集您公开的钱包地址和提供的移动设备信息来处理您向我们提交的反馈。</p>
                    <p class="agree_txt2 agree_margin1">4. 我们收集您的个人信息进行Halle内部审计、数据分析和研究等，以期不断提升我们的服务水平。</p>
                    <p class="agree_txt2 agree_margin1">5. 依照《Halle服务协议》及Halle其他有关规定，Halle将利用用户信息对用户的使用行为进行管理及处理。</p>
                    <p class="agree_txt2 agree_margin1">6. 法律法规规定及与监管机构配合的要求。</p>



                    <p class="agree_txt3 agree_margin">三、 您如何控制自己的信息</p>
                    <p class="agree_txt2 agree_margin1">您在Halle中拥有以下对您个人信息自主控制权：</p>
                    <p class="agree_txt2 agree_margin1">1. 您可以通过同步钱包的方式，将您的其他钱包导入Halle中Halle将向您显示导入钱包的信息。</p>
                    <p class="agree_txt2 agree_margin1">2. 您知悉您可以通过“资产”版块内容进行转账及收款等活动。</p>
                    <p class="agree_txt2 agree_margin1">3. 您知悉在Halle“我”的版块您可以自由选择进行如下操作：</p>
                    <p class="agree_txt2 agree_margin1">（1） 在“联系人”中，您可以随时查看并修改您的“联系人”；</p>
                    <p class="agree_txt2 agree_margin1">（2） 在“个人中心”中，您并不需要提供自己的姓名、手机号码、银行卡等信息，但当您使用特定服务时，您需要提供以上信息；</p>
                    <p class="agree_txt2 agree_margin1">（3） 在“意见反馈”中，您可以随时向我们提出您对Halle问题及改进建议，我们将非常乐意与您沟通并积极改进我们的服务。</p>
                    <p class="agree_txt2 agree_margin1">4. 您知悉当我们出于特定目的向您收集信息时，我们会提前给予您通知，您有权选择拒绝。但同时您知悉，当您选择拒绝提供有关信息时，即表示您放弃使用Halle的有关服务。</p>
                    <p class="agree_txt2 agree_margin1">5. 您知悉，您及我们对于您交易记录是否公开并没有控制权，因为基于区块链交易系统的开源属性，您的交易记录在整个区块链系统中公开透明。</p>
                    <p class="agree_txt2 agree_margin1">6. 您知悉当您使用Halle的功能跳转至第三方DApp之后，我们的<span class="fb">《Halle服务协议》、《Halle隐私政策》</span>将不再适用，针对您在第三方DApp上对您个人信息的控制权问题，我们建议您在使用第三方DApp之前详细阅读并了解其隐私规则和有关用户服务协议等内容。</p>
                    <p class="agree_txt2 agree_margin1">7. 您知悉我们可以根据本政策第一条第6款的要求收集您的信息而无需获得您的授权同意。</p>




                    <p class="agree_txt3 agree_margin">四、 我们可能分享或传输您的信息</p>
                    <p class="agree_txt2 agree_margin1">1. Halle在中华人民共和国境内收集和产生的用户个人信息将存储在中华人民共和国境内的服务器上。若Halle确需向境外传输您的个人信息，将在事前获得您的授权，且按照有关法律法规政策的要求进行跨境数据传输，并对您的个人信息履行保密义务。</p>
                    <p class="agree_txt2 agree_margin1 fb">2. 未经您事先同意，Halle不会将您的个人信息向任何第三方共享或转让，但以下情况除外：</p>
                    <p class="agree_txt2 agree_margin1 fb">（1） 事先获得您明确的同意或授权；</p>
                    <p class="agree_txt2 agree_margin1 fb">（2） 所收集的个人信息是您自行向社会公众公开的；</p>
                    <p class="agree_txt2 agree_margin1 fb">（3） 所收集的个人信息系从合法公开披露的信息中收集，如合法的新闻报道，政府信息公开等渠道；</p>
                    <p class="agree_txt2 agree_margin1 fb">（4） 与Halle的关联方共享，我们只会共享必要的用户信息，且受本隐私条款中所声明的目的的约束；</p>
                    <p class="agree_txt2 agree_margin1 fb">（5） 根据适用的法律法规、法律程序的要求、行政机关或司法机关的要求进行提供；</p>
                    <p class="agree_txt2 agree_margin1 fb">（6） 在涉及合并、收购时，如涉及到个人信息转让，Halle将要求个人信息接收方继续接受本政策的约束。</p>



                    <p class="agree_txt3 agree_margin">五、 我们如何保护您的信息</p>
                    <p class="agree_txt2 agree_margin1">1. 如Halle停止运营，Halle将及时停止继续收集您个人信息的活动，将停止运营的通知公告在Halle上，并对所持有的您的个人信息在合理期限内进行删除或匿名化处理。</p>
                    <p class="agree_txt2 agree_margin1">2. 为了保护您的个人信息，Halle将采取数据安全技术措施，提升内部合规水平，增加内部员工信息安全培训，并对相关数据设置安全访问权限等方式安全保护您的隐私信息。</p>
                    <p class="agree_txt2 agree_margin1">3. 我们将“关于我们”版块更新钱包使用及信息保护的资料，供您参考。</p>



                    <p class="agree_txt3 agree_margin">六、 对未成年人的保护</p>
                    <p class="agree_txt2 agree_margin1">我们对保护未满18周岁的未成年人做出如下特别约定：</p>
                    <p class="agree_txt2 agree_margin1">1. 未成年人应当在父母或监护人指导下使用Halle相关服务。</p>
                    <p class="agree_txt2 agree_margin1">2. 我们建议未成年人的父母和监护人应当在阅读本政策、《Halle服务协议》及我们的其他有关规则的前提下，指导未成年人使用Halle。</p>
                    <p class="agree_txt2 agree_margin1">3. Halle将根据国家相关法律法规的规定保护未成年人的个人信息的保密性及安全性。</p>



                    <p class="agree_txt3 agree_margin">七、 免责声明</p>
                    <p class="agree_txt2 agree_margin1">1. 请您注意，您通过Halle接入第三方DApp后，将适用该第三方DApp发布的隐私政策。该第三方DApp对您个人信息的收集和使用不为Halle所控制，也不受本政策的约束。Halle无法保证第三方DApp一定会按照Halle的要求采取个人信息保护措施。</p>
                    <p class="agree_txt2 agree_margin1">2. 您应审慎选择和使用第三方DApp，并妥善保护好您的个人信息，Halle对其他第三方DApp的隐私保护不负任何责任。</p>
                    <p class="agree_txt2 agree_margin1">3. Halle将在现有技术水平条件下尽可能采取合理的安全措施来保护您的个人信息，以避免信息的泄露、篡改或者毁损。Halle系利用无线方式传输数据，因此，Halle无法确保通过无线网络传输数据的隐私性和安全性。</p>



                    <p class="agree_txt3 agree_margin">八、 其他</p>
                    <p class="agree_txt2 agree_margin1">1. 如您是中华人民共和国以外的用户，您需全面了解并遵守您所在司法辖区与使用Halle服务所有相关法律、法规及规则。</p>
                    <p class="agree_txt2 agree_margin1">2. 您在使用Halle服务过程中，如遇到任何有关个人信息使用的问题，您可以通过在Halle提交反馈等方式联系我们。</p>
                    <p class="agree_txt2 agree_margin1">3. 您可以在Halle中查看本政策及Halle其他服务规则。我们鼓励您在每次访问Halle时都查阅Halle的服务协议及隐私政策。</p>
                    <p class="agree_txt2 agree_margin1">4. 本政策的任何译文版本仅为方便用户而提供，无意对本政策的条款进行修改。如果本政策的中文版本与非中文版本之间存在冲突，应以中文版本为准。</p>
                    <p class="agree_txt2 agree_margin1 fb">5. 本政策自2019年08月17日起适用。</p>
                    <p class="agree_txt3 agree_margin">本政策未尽事宜，您需遵守Halle不时更新的公告及相关规则。</p>


                    <p class="agree_txt3 agree_margin" style="text-align: right;">Halle International Foundation LTD.</p>



                </div>

                <div class="content" v-if="!curLang"
                     :class="[curLang ? '' : 'active']"
                >

                    <!--隐私协议-->
                    <p style="font-weight: bold;">《Halle Privacy Policy》
                    </p>
                    <p style="font-weight: bold;">Updated recently: 15 August 2019
                    </p>
                    <p style="font-weight: bold;">Respected Users:
                    </p>
                    <p style="font-weight: bold;">Halle INTERNATIONAL FOUNDATION. (hereinafter referred to as "Halle" or "We") respects and protects the privacy of users (hereinafter referred to as "you" or "users"). When you use Halle, Halle will collect and use your personal information in accordance with this privacy policy (hereinafter referred to as "this policy").
                    </p>
                    <p style="font-weight: bold;">Halle recommends that you carefully read and understand the whole content of this policy before using this product (hereinafter referred to as "Halle"). Important information, such as disclaimer clauses, will be reflected in a bolder form.The definition of key words in this policy is consistent with the Halle Service Agreement.
                    </p>
                    <p style="font-weight: bold;">This policy can be updated by Halle Online at any time. Once the updated policy is published, it will replace the original policy. If you do not accept the revised clause, please stop using Halle immediately. If you continue using Halle, you will be deemed to accept the revised policy.Once the revised policy is published in Halle, it will take effect automatically.
                    </p>
                    <p style="font-weight: bold;">You are aware that this policy and other relevant provisions apply to DApp owned by Halle and Halle.
                    </p>

                    <p style="font-weight: bold;">One. What information do we collect from you
                    </p>
                    <p style="font-weight: bold;">Please be informed that we collect the following information for your service needs in Halle, and we attach great importance to the protection of your privacy.When we collect your information, we will strictly abide by the principle of "legitimacy, legitimacy and necessity".And you know that your service experience in Halle may be affected if you do not provide the relevant information required for our service.
                    </p>
                    <p>1. We will collect personal information about your mobile devices, operation records, transaction records, wallet addresses and so on.
                    </p>
                    <p>2. To meet your specific service needs, we will probably collect your name, bank card number, mobile phone number, e-mail address and other information.
                    </p>
                    <p style="font-weight: bold;">3. You know: Some of your wallet passwords, private keys and mnemonics on Halle are not stored or synchronized to the server.Halle does not provide services to retrieve your wallet password, private key, mnemonic.
                    </p>
                    <p>4. In addition to the above, you know that when you use Halles specific functions, we will give you special tips before collecting your personal information, asking you to collect more personal information.If you choose not to agree, you will be considered as giving up Halle.
                    </p>
                    <p style="font-weight: bold;">5. When you jump to a third-party DApp, the third-party DApp will collect personal information from you.Halle does not hold personal information collected by third party DApp.
                    </p>
                    <p style="font-weight: bold;">6. To the extent permitted by law and regulations, Halle may collect and use your personal information in the following situations without your authorized consent:
                    </p>
                    <p style="font-weight: bold;">(1) Relating to national security and national defense security;
                    </p>
                    <p style="font-weight: bold;">(2) Relating to public safety, public health and major public interests;
                    </p>
                    <p style="font-weight: bold;">(3) Relevant to criminal investigation, prosecution, trial and execution of judgments;
                    </p>
                    <p style="font-weight: bold;">(4) The personal information collected is open to the public on your own;
                    </p>
                    <p style="font-weight: bold;">(5) Collect your personal information from legitimately disclosed information, such as legitimate news reports, government information disclosure and other channels;
                    </p>
                    <p style="font-weight: bold;">(6) It is necessary to maintain the safety and compliance of services, such as detecting and handling malfunctions of products and services;
                    </p>
                    <p style="font-weight: bold;">(7) Other circumstances prescribed by laws and regulations.
                    </p>

                    <p>7. We collect information in the following ways:
                    </p>
                    <p>(1) You provide us with information.For example, you fill in your name, cell phone number or bank card number on the "Personal Center" page, or provide an email address when you respond to questions, or you give us extra information when you use our specific services.
                    </p>
                    <p>(2) We get information in the process of using Halle, including your mobile device information and your operation record of Halle.
                    </p>
                    <p>(3) We copy all or part of your transaction records through the block chain system.However, the transaction records shall be based on the records of the block chain system.
                    </p>

                    <p style="font-weight: bold;">Two. How do we use your information
                    </p>
                    <p>1. We confirm your correspondence with your wallet through the unique serial number of your mobile device.
                    </p>
                    <p>2. We will send you important notifications in time, such as software updates, service agreements and changes in the terms of this policy.
                    </p>
                    <p>3. We process your feedback to us by collecting your public wallet address and mobile device information.
                    </p>
                    <p>4. We collect your personal information for Halle internal audit, data analysis and research, in order to continuously improve our service level.
                    </p>
                    <p>5. According to the Halle Service Agreement and other relevant Halle regulations, Halle will use user information to manage and process usersusage behavior.
                    </p>
                    <p>6. Laws and regulations and requirements for cooperation with regulatory bodies.
                    </p>

                    <p style="font-weight: bold;">Three. How do you control your information
                    </p>
                    <p>You have the following autonomous control over your personal information in Halle:
                    </p>
                    <p>1. You can import your other wallets into Halle by synchronizing your wallet. Halle will show you the information about the imported wallet.
                    </p>
                    <p>2. You know that you can transfer and collect money through the "Assets" section.
                    </p>
                    <p>3. You know that in the Halle "I" section, you are free to choose the following operations:
                    </p>
                    <p>(1) In Contacts, you can view and modify your Contacts at any time.
                    </p>
                    <p>(2) In the Personal Center, you do not need to provide your name, mobile phone number, bank card and other information, but when you use a specific service, you need to provide the above information;
                    </p>
                    <p>(3) In the "Feedback on Opinions", you can always give us your suggestions on Halle and its improvement. We will be very happy to communicate with you and actively improve our service.
                    </p>
                    <p>4. You know that when we collect information from you for specific purposes, we will give you advance notice and you have the right to refuse.But at the same time, you know that when you choose to refuse to provide relevant information, it means that you give up using Halles related services.
                    </p>
                    <p>5. You know that you and we have no control over whether your trading records are public or not, because based on the open source nature of the block chain trading system, your trading records are open and transparent throughout the block chain system.
                    </p>
                    <p>6. You know that our <span style="font-weight: bold;">《Halle Service Agreement 》</span>、 <span style="font-weight: bold;">《Halle Privacy Policy》</span> will no longer apply when you use Halles function to jump to the third party DApp. In view of your control over your personal information in the third party DApp, we recommend that you read and understand its privacy rules and relevant user service agreements in detail before using the third party DApp.
                    </p>
                    <p>7. You are aware that we can collect your information in accordance with the requirements of Article 1, paragraph 6 of this Policy without your authorized consent.
                    </p>

                    <p style="font-weight: bold;">Four. We may share or transmit your information.
                    </p>
                    <p>1. Personal information collected and generated by Halle in the Peoples Republic of China will be stored on servers in the Peoples Republic of China.If Halle really needs to transmit your personal information overseas, it will obtain your authorization beforehand, and carry out cross-border data transmission in accordance with the requirements of relevant laws, regulations and policies, and fulfill the obligation of confidentiality of your personal information.
                    </p>
                    <p style="font-weight: bold;">2. Halle will not share or transfer your personal information to any third party without your prior consent, except in the following cases:
                    </p>
                    <p style="font-weight: bold;">(1) Obtain your explicit consent or authorization in advance;
                    </p>
                    <p style="font-weight: bold;">(2) The personal information collected is open to the public on your own;
                    </p>
                    <p style="font-weight: bold;">(3) Personal information collected is collected from lawfully disclosed information, such as lawful news reports, government information disclosure and other channels;
                    </p>
                    <p style="font-weight: bold;">(4) To share with Halles affiliates, we will only share the necessary user information, subject to the purposes stated in this privacy clause;
                    </p>
                    <p style="font-weight: bold;">(5) Provision shall be made in accordance with applicable laws and regulations, requirements of legal procedures and requirements of administrative or judicial organs;
                    </p>
                    <p style="font-weight: bold;">(6) In the case of mergers and acquisitions, if personal information transfer is involved, Halle will require the recipient of personal information to continue to accept the constraints of this policy.
                    </p>

                    <p style="font-weight: bold;">Five. How do we protect your information
                    </p>
                    <p>1. If Halle ceases to operate, Halle will stop collecting your personal information in time, announce the suspension on Halle, and delete or anonymize your personal information within a reasonable period of time.
                    </p>
                    <p>2. In order to protect your personal information, Halle will adopt data security technology measures to enhance internal compliance level, increase internal staff information security training, and set security access rights to relevant data to protect your privacy information.
                    </p>
                    <p>3. We will update our wallet usage and information protection for your reference.
                    </p>

                    <p style="font-weight: bold;">Six. Protection of minors
                    </p>
                    <p>We have made the following special agreements on the protection of minors under the age of 18:
                    </p>
                    <p>1. Minors should use Halle-related services under the guidance of their parents or guardians.
                    </p>
                    <p>2. We recommend that parents and guardians of minors should guide minors to use Halle on the premise of reading this policy, the Halle Service Agreement and other relevant rules.
                    </p>
                    <p>3. Halle will protect the confidentiality and security of minorspersonal information in accordance with relevant national laws and regulations.
                    </p>

                    <p style="font-weight: bold;">Seven. Disclaimer
                    </p>
                    <p>1. Please note that after you access third party DApp through Halle, the privacy policy issued by the third party DApp will apply.The collection and use of your personal information by the third party DApp is not controlled by Halle, nor is it subject to this policy.Halle cant guarantee that third party DApp will take personal information protection measures according to Halles requirements.
                    </p>
                    <p>2. You should carefully choose and use third party DApp, and properly protect your personal information. Halle is not responsible for the privacy protection of other third party DApp.
                    </p>
                    <p>3. Halle will take reasonable security measures to protect your personal information as far as possible under the current technological level, so as to avoid information leakage, tampering or damage.Halle system transmits data by wireless mode, so Halle can not ensure the privacy and security of data transmission through wireless network.
                    </p>

                    <p style="font-weight: bold;">Eight. OTHER</p>
                    <p>1. If you are a user outside the Peoples Republic of China, you need to fully understand and abide by all relevant laws, regulations and rules concerning the use of Halle services in your jurisdiction.
                    </p>
                    <p>2. In the process of using Halle service, if you encounter any problems related to the use of personal information, you can contact us by submitting feedback from Halle, etc.
                    </p>
                    <p>3. You can view this policy and other Halle service rules in Halle.We encourage you to consult Halles service protocols and privacy policies every time you visit Halle.
                    </p>
                    <p>4. Any translated version of this policy is provided only for the convenience of users, and there is no intention to modify the terms of this policy.If there is a conflict between the Chinese version and the non-Chinese version of this policy, the Chinese version shall prevail.
                    </p>
                    <p style="font-weight: bold;">5. This policy has been applied since 15 August 2019.
                    </p>
                    <p style="font-weight: bold;">This policy is not exhaustive. You should abide by Halles announcements and relevant rules which are updated from time to time.
                    </p>
                    <p style="text-align: right;font-weight: bold;"> Halle International Foundation LTD.
                    </p>



                </div>




            </div>
        </div>
    </div>
</template>

<script>

    import { mapGetters } from 'vuex'

    export default {
        name: "PrivacyAgreement",
        computed: {
            curLang(){
                return this.getLang() == 'zh-CN' ? true : false
            },

        },
        methods: {
            ...mapGetters(['getLang']),
        }

    }

</script>

<style scoped>
    .agree_txt1{ font-size: 0.3rem;color: #333;line-height: 0.48rem;}
    .agree_wrapper{
        background: #fafafa;
        height: 100%;
        overflow-y: auto;
    }
    .agree_txt3{
        font-size: 0.28rem;color: #333;line-height: 0.48rem;font-weight: bold;
    }
    .agree_margin1{
        margin-top: 0.1rem;
    }
    .agree_margin{ margin-top: 0.48rem;}
    .agree_txt2{ font-size: 0.26rem;color: #333;line-height: 0.48rem;text-align:justify;
        /*text-indent:0.5rem;*/
    }
    .content{ background: #fff;padding: 0.2rem 0.4rem 0.56rem;}
    .fb{
        font-weight: bold;
    }
    .content.active * {
        width: 100%;
        word-wrap: break-word;
        font-size: 0.3rem;
        color: #333;
        line-height: 0.6rem;
        text-align: justify;
    }
</style>
