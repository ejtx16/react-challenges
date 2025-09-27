import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";

export const Route = createFileRoute("/password-generator")({
  component: PasswordGenerator,
});

function PasswordGenerator() {
  const [uppercase, setUppercase] = useState(false);
  const [lowercase, setLowercase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [passwordLength, setPasswordLength] = useState(12);
  const [generatedPassword, setGeneratedPassword] = useState("");

  function handleCheckboxChange(type: string) {
    if (type === "uppercase") {
      setUppercase(!uppercase);
    } else if (type === "lowercase") {
      setLowercase(!lowercase);
    } else if (type === "numbers") {
      setNumbers(!numbers);
    } else if (type === "symbols") {
      setSymbols(!symbols);
    }
  }

  function handleGeneratePassword() {
    const lowercaseString = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersValue = "0123456789";
    const symbolsValue = "!@#$%^&*()_+[]{}|;:,.<>/";

    let password = "";
    if (uppercase) {
      password += uppercaseString;
    }
    if (lowercase) {
      password += lowercaseString;
    }
    if (numbers) {
      password += numbersValue;
    }
    if (symbols) {
      password += symbolsValue;
    }
    password = Array.from({ length: passwordLength }, () => password[Math.floor(Math.random() * password.length)]).join("");

    console.log("=== 1 password password-generator.tsx [51] ===>", password);
    setGeneratedPassword(password);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-2xl font-bold">Password Generator</p>
        <div className="flex flex-col items-center justify-start gap-8 mt-20">
          <div className="grid grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Checkboxes Section */}
            <div className="flex flex-col items-center justify-start gap-4 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Options</h3>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="uppercase"
                    name="uppercase"
                    value="Uppercase"
                    checked={uppercase}
                    onChange={() => handleCheckboxChange("uppercase")}
                  />
                  <label htmlFor="uppercase">Uppercase</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="lowercase"
                    name="lowercase"
                    value="Lowercase"
                    checked={lowercase}
                    onChange={() => handleCheckboxChange("lowercase")}
                  />
                  <label htmlFor="lowercase">Lowercase</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="numbers"
                    name="numbers"
                    value="Numbers"
                    checked={numbers}
                    onChange={() => handleCheckboxChange("numbers")}
                  />
                  <label htmlFor="numbers">Numbers</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="symbols"
                    name="symbols"
                    value="Symbols"
                    checked={symbols}
                    onChange={() => handleCheckboxChange("symbols")}
                  />
                  <label htmlFor="symbols">Symbols</label>
                </div>
              </div>
            </div>

            {/* Password Generation Section */}
            <div className="flex flex-col items-center justify-start gap-4 p-6 border rounded-lg bg-gray-50">
              <h3 className="text-lg font-semibold mb-2">Generate</h3>
              <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-2">
                  <label htmlFor="password-length">Password Length</label>
                  <input
                    type="number"
                    id="password-length"
                    name="password-length"
                    placeholder="12"
                    min="4"
                    max="128"
                    className="px-3 py-2 border rounded-md"
                    value={passwordLength}
                    onChange={(e) => setPasswordLength(Number(e.target.value))}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="generated-password">Generated Password</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="generated-password"
                      name="generated-password"
                      placeholder="Your password will appear here"
                      readOnly
                      className="px-3 py-2 pr-10 border rounded-md bg-white w-full"
                      value={generatedPassword}
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded transition-colors"
                      title="Copy to clipboard"
                      onClick={() => {
                        const passwordInput = document.getElementById("generated-password") as HTMLInputElement;
                        if (passwordInput && passwordInput.value) {
                          navigator.clipboard.writeText(passwordInput.value);
                          // Optional: Add visual feedback here
                        }
                      }}
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => handleGeneratePassword()}
                >
                  Generate Password
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="flex flex-col items-center justify-center gap-4">
          <input type="text" name="password" placeholder="Password" />
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Generate Password</button>
        </div> */}
      </div>
    </>
  );
}
