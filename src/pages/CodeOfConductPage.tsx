import { Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export default function CodeOfConductPage() {
  return (
    <div className="min-h-screen bg-white pt-20">

      {/* ── Header ── */}
      <div className="bg-[var(--navy)] section-padding py-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Official Document · Revision: August 2025"
            title="AASB Code of Conduct"
            subtitle="Association of American Schools in Brazil"
            light
          />
          <a
            href="/code-of-conduct.pdf"
            download="AASB_Code_of_Conduct.pdf"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-heading font-semibold text-sm hover:bg-yellow-300 transition-colors shadow-md"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="section-padding max-w-4xl mx-auto py-12">
        <div className="font-body text-sm text-[var(--text)] leading-relaxed space-y-6">

          {/* Intro */}
          <p>
            All AASB schools have mission statements that speak of high academic expectations and high
            expectations for character development and community building. We believe extra-curricular trips
            demand an increased layer of behavioral expectations and that the elements of risk are heightened
            for teachers, administrators, parents, students, and the school due to the elevated risk inherent in
            taking a number of students off campus.
          </p>

          {/* DEI */}
          <div>
            <h2 className="font-heading font-bold text-base underline text-center mb-3">
              Diversity, Equity and Inclusion Statement
            </h2>
            <p className="mb-3">
              The Association of American Schools in Brazil (AASB) is committed to diversity, inclusion, and gender
              equity amongst its members, event participants, volunteers, and community. AASB welcomes all
              individuals to participate in our event offerings. Embracing our differences while removing barriers
              to promote diversity, equity and foster inclusion, is integral to serving the educational athletics and
              activities community. As leaders in our community, we continue to listen, learn and collaborate on
              how educational athletics and activities can be inclusive and accessible for all. We have zero
              tolerance for any behaviors which discriminate against anyone - athletes, coaches, referees, staff,
              guests - through language or interactions that target their identity or culture in any way. Our
              athletics and activities programs are created to be safe and inclusive spaces for all student-athletes
              and participants.
            </p>
            <p>
              Any violations of this statement will result in immediate action through the process of our
              Disciplinary Committee, which is explained in our AASB Athletics &amp; Activities Constitution.
            </p>
          </div>

          <p>
            Given the above, we believe a set of clear behavioral expectations and aligned consequences is
            necessary to help our schools support positive behavior and address infractions and violations
            consistently.
          </p>

          {/* Level I */}
          <div>
            <p className="mb-2">
              <strong>Level I - Minor Infractions</strong> include the following, but are not limited to:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Violation of Curfew</li>
              <li>Poor Sportsmanship</li>
            </ol>
          </div>

          {/* Level II */}
          <div>
            <p className="mb-2">
              <strong>Level II - Major Infractions</strong> include the following, but are not limited to:
            </p>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Leaving any AASB venue without permission and/or proper supervision</li>
              <li>Use or possession of drugs/alcohol/tobacco/vaporisers/weapons</li>
              <li>Physical, sexual, or verbal abuse, including violation of the AASB DEI statement</li>
              <li>Emotional abuse such as hazing and bullying.</li>
            </ol>
          </div>

          <p className="font-bold">
            In case of Major Infraction level violation, a Disciplinary Committee will be formed and will refer
            to the AASB Constitution to determine the consequences.
          </p>

          {/* Consequences */}
          <div>
            <h2 className="font-heading font-bold text-base mb-3">Consequences of Violations: Students</h2>
            <ul className="list-disc list-inside ml-4 space-y-2">
              <li>
                <strong>Level I - Minor Infractions:</strong> (e.g., curfew violation, poor sportsmanship) result in suspension
                from the next scheduled game.
              </li>
              <li>
                <strong>Level II - Major Infractions:</strong> (e.g., leaving the venue without permission, possession of
                prohibited substances or weapons, abuse, hazing) result in immediate ineligibility from the
                current event, early return home at the parents' expense, and exclusion from future events
                for up to one year.
              </li>
              <li>
                <strong>Note:</strong> Repeated Level 1 Infractions may result in Level II consequences.
              </li>
            </ul>
          </div>

          {/* Student responsibilities */}
          <div>
            <h2 className="font-heading font-bold text-base mb-3">Responsibilities of Students and Participants</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Treat everyone with kindness and respect.</li>
              <li>Follow all established rules and guidelines to ensure a smooth and enjoyable event.</li>
              <li>Use positive and appropriate language at all times.</li>
              <li>Maintain a peaceful and cooperative attitude.</li>
              <li>Respect curfews and stay within the areas assigned to participants.</li>
              <li>Support a safe and respectful environment by honoring all procedures and expectations.</li>
            </ul>
          </div>

          {/* Parent responsibilities */}
          <div>
            <h2 className="font-heading font-bold text-base mb-3">Responsibilities of Parents and Spectators</h2>
            <p className="mb-2">Parents/Visitors must sign the AASB code of conduct upon entry to the camp.</p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Be familiar with the tournament rules and the AASB code of conduct.</li>
              <li>Encourage positive behavior and respect for all participants.</li>
              <li>Use positive and appropriate language at all times.</li>
              <li>Support fair play and sportsmanship at all times.</li>
              <li>Thank coaches, chaperones, and officials for their efforts.</li>
            </ul>
          </div>

          {/* Signatures */}
          <div className="border-t border-[var(--border)] pt-8 mt-8">
            <h2 className="font-heading font-bold text-base text-center mb-4">SIGNATURES</h2>
            <p className="mb-3">
              A student may not participate in an AASB event until this form has been signed by both the
              student and parent/guardian and is on file at their school.
            </p>
            <p className="mb-8">
              The undersigned has received a copy of the Association of American Schools in Brazil - AASB
              Code of Conduct.
            </p>

            <div className="space-y-10">
              {/* Student name */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Student's Name (please print)</p>
                </div>
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Year of Graduation</p>
                </div>
              </div>

              <p className="text-xs">
                I understand and agree to abide by all the provisions of the Association of American Schools in
                Brazil – AASB Code of Conduct as well as my own school's established policies and code of conduct.
              </p>

              {/* Student signature */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Student's Signature</p>
                </div>
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Date</p>
                </div>
              </div>

              <p className="text-xs">
                I understand and agree to abide by all the provisions of the Association of American Schools in
                Brazil - AASB Code of Conduct as well as my child's school's established policies and code of conduct.
              </p>

              {/* Parent signature */}
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Parent / Guardian's Signature</p>
                </div>
                <div>
                  <div className="border-b border-[var(--text)] mb-2 h-8" />
                  <p className="font-semibold text-center text-xs">Date</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}