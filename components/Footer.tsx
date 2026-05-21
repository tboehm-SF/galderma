"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

export default function Footer() {
  const [dysportOpen, setDysportOpen] = useState(false);
  const [restylaneOpen, setRestylaneOpen] = useState(false);
  const [sculptraOpen, setSculptraOpen] = useState(false);

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* ISI Banner - Always Visible */}
      <div className="bg-[#F5F1EC]/50 border-b border-gray-200 px-6 lg:px-10 py-4">
        <p className="text-xs text-[#2C2C2C]/80 leading-relaxed max-w-7xl mx-auto">
          <span className="font-semibold text-[#4A5D7F]">Please read full Important Safety Information</span> for{" "}
          <span className="italic">Dysport</span>, for frown lines between the brows, including Distant Spread of Toxin Effect Boxed Warning at bottom of page.
        </p>
      </div>

      {/* Product Safety Information Sections */}
      <div className="border-b border-gray-100">
        {/* Dysport Safety Info */}
        <div className="border-b border-gray-50">
          <button
            onClick={() => setDysportOpen(!dysportOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={dysportOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Important Safety Information for Dysport® (abobotulinumtoxinA) for Injection
            </span>
            {dysportOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {dysportOpen && (
            <div className="px-6 lg:px-10 py-8 bg-[#F5F1EC]/20 text-[13px] text-[#2C2C2C]/80 leading-relaxed space-y-5 border-t border-gray-50 max-w-5xl">
              <p>
                <span className="font-semibold text-[#2C2C2C]">Dysport® (abobotulinumtoxinA) for Injection</span> is an acetylcholine release inhibitor and a neuromuscular blocking agent indicated for the temporary improvement in the appearance of moderate to severe glabellar lines associated with procerus and corrugator muscle activity in adults ˂65 years of age.
              </p>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">Important Safety Information — Distant Spread of Toxin Effect</h5>
                <p>
                  Postmarketing reports indicate that the effects of Dysport and all botulinum toxin products may spread from the area of injection to produce symptoms consistent with botulinum toxin effects. These may include asthenia, generalized muscle weakness, diplopia, blurred vision, ptosis, dysphagia, dysphonia, dysarthria, urinary incontinence and breathing difficulties. These symptoms have been reported hours to weeks after injection. Swallowing and breathing difficulties can be life threatening and there have been reports of death. The risk of symptoms is probably greatest in children treated for spasticity but symptoms can also occur in adults treated for spasticity and other conditions, particularly in those patients who have underlying conditions that would predispose them to these symptoms. In unapproved uses and in approved indications, cases of spread of effect have been reported at doses comparable to or lower than the maximum recommended total dose.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">CONTRAINDICATIONS</h5>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Hypersensitivity to any botulinum toxin product or excipients</li>
                  <li>Allergy to cow&apos;s milk protein</li>
                  <li>Infection at the proposed injection site(s)</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">WARNINGS AND PRECAUTIONS</h5>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>The potency Units of Dysport are not interchangeable with other preparations of botulinum toxin products and, therefore, units of biological activity of Dysport cannot be compared to or converted into units of any other botulinum toxin products.</li>
                  <li>Immediate medical attention may be required in cases of respiratory, speech or swallowing difficulties.</li>
                  <li>Recommended dose and frequency of administration should not be exceeded.</li>
                  <li>Dry eye may occur with glabellar line treatment, if symptoms persist, consider referring patient to an ophthalmologist.</li>
                  <li>Concomitant neuromuscular disorder may exacerbate clinical effects of treatment.</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">ADVERSE REACTIONS</h5>
                <p>
                  In clinical studies, the most frequently reported adverse events (≥2%) were nasopharyngitis, headache, injection site pain, injection site reaction, upper respiratory tract infection, eyelid edema, eyelid ptosis, sinusitis, nausea, and blood present in urine.
                </p>
              </div>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">DRUG INTERACTIONS</h5>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Concomitant use of Dysport and aminoglycosides or other agents interfering with neuromuscular transmission or muscle relaxants, should be observed closely because effect of Dysport may be potentiated.</li>
                  <li>Anticholinergic drugs may potentiate systemic anticholinergic effects.</li>
                  <li>The effect of administering different botulinum neurotoxins during course of treatment with Dysport is unknown.</li>
                </ul>
              </div>

              <div>
                <h5 className="font-bold text-[#2C2C2C] text-sm mb-2">USE IN SPECIFIC POPULATIONS</h5>
                <p>Dysport is not recommended for use in children or pregnant women.</p>
              </div>

              <p className="text-xs text-[#2C2C2C]/60 italic">
                You are encouraged to report negative side effects of prescription drugs to the FDA. Visit{" "}
                <a href="https://www.fda.gov/medwatch" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:underline underline-offset-2">www.fda.gov/medwatch</a> or call 1-800-FDA-1088.
              </p>

              <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-200">
                <a href="https://www.dysportusa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Full Prescribing Information <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://www.dysportusa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Medication Guide <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://www.dysportusa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  DysportUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Restylane Safety Info */}
        <div className="border-b border-gray-50">
          <button
            onClick={() => setRestylaneOpen(!restylaneOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={restylaneOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Important Safety Information for the Restylane® Family
            </span>
            {restylaneOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {restylaneOpen && (
            <div className="px-6 lg:px-10 py-8 bg-[#F5F1EC]/20 text-[13px] text-[#2C2C2C]/80 leading-relaxed space-y-5 border-t border-gray-50 max-w-5xl">
              <p className="font-semibold text-[#2C2C2C] text-sm">
                Restylane® Lyft with Lidocaine, Restylane® Silk, Restylane® Kysse, Restylane® Refyne, Restylane® Defyne, Restylane® Contour, and Restylane® Eyelight.
              </p>

              <div className="space-y-3">
                <p><span className="font-semibold">Restylane</span> and <span className="font-semibold">Restylane-L</span> are for mid-to-deep injection into the facial tissue for the correction of moderate-to-severe facial wrinkles and folds, such as nasolabial folds, and for lip enhancement.</p>

                <p><span className="font-semibold">Restylane Lyft with Lidocaine</span> is for deep implantation into the facial tissue for the correction of moderate-to-severe facial wrinkles and folds, such as nasolabial folds, and for cheek augmentation and for the correction of age-related midface contour deficiencies. Restylane Lyft with Lidocaine is also indicated for injection into the dorsal hand to correct volume loss. Restylane Lyft with Lidocaine is also indicated for injection into the mid-to-deep dermis (subcutaneous and/or supraperiosteal) for augmentation of the chin region to improve the chin profile in patients with mild-to-moderate chin retrusion.</p>

                <p><span className="font-semibold">Restylane Silk</span> is for lip augmentation and for correction of perioral wrinkles.</p>

                <p><span className="font-semibold">Restylane Kysse</span> is for lip augmentation and for correction of upper perioral wrinkles.</p>

                <p><span className="font-semibold">Restylane Refyne</span> is for mid-to-deep injection into the facial tissue for the correction of moderate-to-severe facial wrinkles and folds, such as nasolabial folds.</p>

                <p><span className="font-semibold">Restylane Defyne</span> is for mid-to-deep injection into the facial tissue for the correction of moderate-to-severe, deep facial wrinkles and folds, such as nasolabial folds. Restylane Defyne is also indicated for injection into the mid-to-deep dermis (subcutaneous and/or supraperiosteal) for augmentation of the chin region to improve the chin profile in patients with mild-to-moderate chin retrusion.</p>

                <p><span className="font-semibold">Restylane Contour</span> is for cheek augmentation and for the correction of midface contour deficiencies, and for correction of temple hollowing.</p>

                <p><span className="font-semibold">Restylane Eyelight</span> is for the improvement of infraorbital hollowing.</p>
              </div>

              <p>
                Do not use if you have severe allergies that have required in-hospital treatment, are allergic to lidocaine or gram-positive bacterial proteins used to make hyaluronic acid, prone to bleeding, or have a bleeding disorder. The safety of use while pregnant or breastfeeding has not been studied. Tell your doctor if you are planning other cosmetic treatments (such as lasers and chemical peels) as there is a possible risk of inflammation at the injection site.
              </p>

              <p>
                The most common side effects include swelling, redness, pain, bruising, headache, tenderness, lump formation, itching at the injection site, and impaired hand function (Restylane Lyft – hand injection). Tell your doctor if you&apos;re taking medications that lower your body&apos;s immune response or affect bleeding, such as aspirin or warfarin; these medications may increase the risk of bruising or bleeding at the gel injection site. Use at the site of skin sores, pimples, rashes, hives, cysts, or infection should be postponed until healing is complete.
              </p>

              <p>
                Delayed-onset inflammation near the site of dermal filler injections is one of the known adverse events associated with dermal fillers, and cases have been reported to occur at the dermal filler treatment site following viral or bacterial illnesses or infections, vaccinations, or dental procedures. Typically, the reported inflammation was responsive to treatment or resolved on its own. Serious but rare side effects include delayed-onset infections, recurrence of herpetic eruptions, superficial necrosis, and scarring at the injection site. The risk of unintentional injection into a blood vessel is small but can occur and could result in serious complications, which may be permanent including, vision abnormalities, blindness, stroke, temporary scabs, or permanent scarring of the skin. As with all skin injection procedures, there is a risk of infection.
              </p>

              <div className="pt-3 border-t border-gray-200">
                <a href="https://www.restylaneusa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Learn more at RestylaneUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Sculptra Safety Info */}
        <div>
          <button
            onClick={() => setSculptraOpen(!sculptraOpen)}
            className="w-full px-6 lg:px-10 py-4.5 flex items-center justify-between hover:bg-[#F5F1EC]/30 transition-colors duration-300 text-left group"
            aria-expanded={sculptraOpen}
          >
            <span className="text-sm font-medium text-[#2C2C2C]/80 group-hover:text-[#4A5D7F] transition-colors duration-300">
              Important Safety Information for Sculptra® (injectable poly-L-lactic acid)
            </span>
            {sculptraOpen ? (
              <ChevronUp className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 transition-transform duration-300" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[#4A5D7F] flex-shrink-0 group-hover:translate-y-0.5 transition-transform duration-300" />
            )}
          </button>

          {sculptraOpen && (
            <div className="px-6 lg:px-10 py-8 bg-[#F5F1EC]/20 text-[13px] text-[#2C2C2C]/80 leading-relaxed space-y-5 border-t border-gray-50 max-w-5xl">
              <p>
                <span className="font-semibold text-[#2C2C2C]">Sculptra® (injectable poly-L-lactic acid [PLLA-SCA])</span> is indicated for correction of shallow to deep nasolabial fold contour deficiencies, fine lines and wrinkles in the cheek region, and other facial wrinkles.
              </p>

              <p>
                Sculptra should not be used by people that are allergic to any ingredient of the product or have a history of keloid formation or hypertrophic scarring. Safety has not been established in patients who are pregnant, lactating, breastfeeding, or under 18 years of age.
              </p>

              <p>
                Sculptra has unique injection requirements and should only be used by a trained healthcare practitioner. Contour deficiencies should not be overcorrected because they are expected to gradually improve after treatment.
              </p>

              <p>
                Sculptra should not be injected into the blood vessels as it may cause vascular occlusion, infarction, or embolic phenomena. Use at the site of skin sores, cysts, pimples, rashes, hives, or infection should be postponed until healing is complete. Sculptra should not be injected into the red area (vermillion) of the lip or in the peri-orbital area.
              </p>

              <p>
                The most common side effects after initial treatment include injection site swelling, tenderness, redness, pain, bruising, bleeding, itching, and lumps. Other side effects may include small lumps under the skin that are sometimes noticeable when pressing on the treated area. Larger lumps, some with delayed onset with or without inflammation or skin discoloration, have also been reported.
              </p>

              <p className="text-xs text-[#2C2C2C]/60 italic">
                Sculptra is available only through a licensed practitioner.
              </p>

              <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-200">
                <a href="https://www.sculptrausa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  Instructions for Use <ExternalLink className="w-3 h-3" />
                </a>
                <a href="https://www.sculptrausa.com" target="_blank" rel="noopener noreferrer" className="text-[#4A5D7F] hover:text-[#3A4D6F] inline-flex items-center gap-1.5 text-xs font-medium hover:underline underline-offset-4">
                  SculptraUSA.com <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer Links */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
        {/* Brand mark */}
        <div className="text-center mb-10">
          <span className="text-lg font-light tracking-[0.3em] text-[#4A5D7F]/60">
            ASPIRE
          </span>
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">HCP</p>
        </div>

        {/* Main Footer Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8 text-[13px]">
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Contact
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Terms of Use
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Privacy Policy
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            About Galderma
          </a>
          <a href="#" className="text-[#2C2C2C]/70 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Contact Galderma
          </a>
        </div>

        {/* Secondary Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10 text-[13px]">
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Your Privacy Choices
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Cookie Policy
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Cookies Settings
          </a>
          <a href="#" className="text-[#2C2C2C]/50 hover:text-[#4A5D7F] transition-colors duration-300 font-light">
            Consumer Health Data Privacy Policy
          </a>
        </div>

        {/* Copyright & Legal */}
        <div className="pt-8 border-t border-gray-100 text-center space-y-2">
          <p className="text-xs text-gray-400 font-light">
            ©{new Date().getFullYear()} Galderma Laboratories, L.P. This site is intended for U.S. audiences only.
          </p>
          <p className="text-[11px] text-gray-300 font-light">
            The Dysport trademark is used under license. All other trademarks are the property of their respective owners.
          </p>
          <p className="text-[10px] text-gray-300 font-light mt-1">
            USMP/ASP/0021/1018(1)
          </p>
        </div>
      </div>
    </footer>
  );
}
