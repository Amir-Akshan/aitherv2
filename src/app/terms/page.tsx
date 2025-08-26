export default function Terms() {
  const lastUpdated = new Date("2024-12-24").toLocaleDateString();

  return (
    <div className="flex min-h-full items-center justify-center py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
          <h1 className="text-xl font-bold mb-8 text-white">Terms of Service</h1>

          <div className="space-y-6 text-gray-300">
            <section>
              <h2 className="text-lg font-semibold mb-3 text-white">
                1. Acceptance of Terms
              </h2>
              <p className="text-sm">
                By accessing and using AitherLabs&apos; services, you agree to be
                bound by these Terms of Service.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 text-white">2. Use License</h2>
              <p className="text-sm">
                Our content is licensed under the MIT License. You may view and
                fork our repositories according to the license terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 text-white">3. Limitations</h2>
              <p className="text-sm">You agree not to:</p>
              <ul className="list-disc ml-6 mt-2 text-sm">
                <li>Use our services for any unlawful purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 text-white">4. Disclaimer</h2>
              <p className="text-sm">
                Our services are provided &quot;as is&quot; without any
                warranties, express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-semibold mb-3 text-white">
                5. Changes to Terms
              </h2>
              <p className="text-sm">
                We reserve the right to modify these terms at any time. Last
                updated: {lastUpdated}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
