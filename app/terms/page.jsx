const TermsOfService = () => {
  return (
    <div className="p-5 text-gray-800 bg-gradient-to-r from-blue-100 to-purple-100">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-purple-700">
        Terms of Service
      </h1>
      <p className="text-sm mb-4 text-center italic">
        Last updated: [Insert Date]
      </p>

      <p className="mb-4">
        Welcome to [App Name]! These terms of service (&quot;Terms&quot;) govern
        your use of our application or website (&quot;App&quot;). By accessing
        or using the App, you agree to be bound by these Terms. If you do not
        agree to these Terms, please do not use the App.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        1. Use of the App
      </h2>
      <p className="mb-4">
        You must be at least 13 years old to use our App. By using the App, you
        represent that you meet this requirement. You are responsible for your
        use of the App and for any content you share or actions you take.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        2. Google Authentication
      </h2>
      <p className="mb-4">
        {" "}
        Our App uses Google Authentication (&quot;Google Auth&quot;) to verify
        your identity. You agree to the terms of service provided by Google when
        using Google Auth. We are not responsible for any issues arising from
        your use of Google Auth.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        3. User Responsibilities
      </h2>
      <p className="mb-4">
        You agree not to misuse the App or assist anyone else in doing so.
        Misuse includes, but is not limited to:
      </p>
      <ul className="list-disc list-inside mb-4 pl-5">
        <li>[Content for User Responsibilities]</li>
        <li>Posting illegal, harmful, or offensive content.</li>
        <li>Violating any applicable laws or regulations.</li>
      </ul>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        4. Limitation of Liability
      </h2>
      <p className="mb-4">
        [App Name] will not be liable for any indirect, incidental, or
        consequential damages resulting from your use of the App. Your use of
        the App is at your own risk.
      </p>

      <h2 className="text-3xl font-semibold mb-3 text-blue-600">
        5. Modifications to the Terms
      </h2>
      <p className="mb-4">
        We reserve the right to update or modify these Terms at any time. We
        will notify you of any changes by posting the updated Terms on this
        page. Your continued use of the App after the changes take effect will
        indicate your acceptance of the new Terms.
      </p>

      <p className="text-center">
        If you have any questions about these Terms, please contact us at
        3Lite@gmail.com.
      </p>
    </div>
  );
};

export default TermsOfService;
