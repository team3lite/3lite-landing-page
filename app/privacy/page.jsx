const PrivacyPolicy = () => {
  return (
    <div className="p-5 text-gray-800 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-700">
        Privacy Policy
      </h1>
      <p className="text-sm mb-4 text-center italic">Last updated: 10/7/2024</p>

      <p className="mb-4">
        Welcome to 3Lite! We (&quot;we&quot;, &quot;our&quot;, or
        &quot;us&quot;) are committed to protecting your privacy. This Privacy
        Policy explains how we collect, use, disclose, and safeguard your
        information when you use our application or website (&quot;App&quot;),
        including when using Google Authentication (&quot;Google Auth&quot;).
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        1. Information We Collect
      </h2>
  

      <p className="mb-4">
        Rest assured, we do not collect or store your Google password. The
        authentication process is securely handled through Google.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        2. How We Use Your Information
      </h2>
      <p className="mb-2">We use the information we collect to:</p>
      <ul className="list-disc list-inside mb-4 pl-5">
        <li>Authenticate you and allow you to log into the App.</li>
        <li>
          Personalize your user experience based on the information provided by
          Google Auth.
        </li>
      </ul>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        3. Data Sharing and Disclosure
      </h2>
      <p className="mb-4">
        We do not sell or share your personal information with third parties.
        Your data is only shared as necessary to provide the services you have
        requested.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">4. Security</h2>
      <p className="mb-4">
        We use reasonable administrative, technical, and physical security
        measures to protect your personal information. However, no method of
        transmission over the internet is 100% secure.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        5. Changes to This Privacy Policy
      </h2>
      <p className="mb-4">
        We may update this Privacy Policy from time to time. We will notify you
        of any changes by posting the new policy on this page.
      </p>

      <p className="text-center">
        If you have any questions, contact us at{" "}
        <a href="mailto:privacy@3Lite.com" className="text-blue-500 underline">
          privacy@3Lite.com
        </a>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
