import { Download } from 'lucide-react'
import SectionHeader from '@/components/ui/SectionHeader'

export default function InfoPage() {
  return (
    <div className="min-h-screen bg-white pt-20">

      {/* ── Header ── */}
      <div className="bg-[var(--navy)] section-padding py-12">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Official Document"
            title="AASB Athletics Constitution"
            subtitle="Association of American Schools in Brazil"
            light
          />
          <a
            href="/athletics-constitution.pdf"
            download="AASB_Athletics_Constitution.pdf"
            className="flex-shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[var(--gold)] text-[var(--navy)] font-heading font-semibold text-sm hover:bg-yellow-300 transition-colors shadow-md"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="section-padding max-w-4xl mx-auto py-12">
        <div className="prose-content">

          {/* Mission Statement */}
          <Section title="Mission Statement" boxed>
            <p>
              The AASB National tournaments is designed to provide Middle School and High School
              student-athletes from AASB schools with the opportunity to engage in healthy competition
              in girls' and boys' soccer, basketball, volleyball, futsal, softball and cheer in an effort to improve
              attitudes toward fair play and friendship. Participation and sportsmanship are to be held in
              the highest regard whereby individual team success is held in a reasonable perspective. All
              thirteen schools and individual teams are encouraged to provide an active learning
              experience for all participants.
            </p>
          </Section>

          {/* Article 1 */}
          <Section title="Article 1. Membership" boxed>
            <p className="underline font-semibold mb-2">Member schools:</p>
            <ol className="list-decimal list-inside space-y-1 mb-6">
              <li>American School of Belo Horizonte (EABH) - Escola Americana de Belo Horizonte</li>
              <li>American School of Brasilia (EAB) - Associação Escola Americana de Brasília</li>
              <li>American School of Campinas (EAC) - Escola Americana de Campinas</li>
              <li>American School of Recife (EAR) - Escola Americana de Recife</li>
              <li>American School of Rio de Janeiro (EARJ) - Escola Americana do Rio de Janeiro</li>
              <li>Chapel School - Oblatos de Maria Imaculada</li>
              <li>Graded School - Associação Escola Graduada de São Paulo</li>
              <li>International School of Curitiba (ISC)</li>
              <li>Our Lady of Mercy American School - Rio de Janeiro (OLM)</li>
              <li>Pan American Christian Academy (PACA)</li>
              <li>Pan American School of Bahia (PASB) - Escola Pan Americana da Bahia</li>
              <li>Sant'Anna International School</li>
              <li>School of the Nations - Escola das Nações (Nations)</li>
            </ol>
            <p className="underline font-semibold mb-2">Invited schools:</p>
            <ul className="list-disc list-inside space-y-1 italic mb-4">
              <li>The British School of Rio de Janeiro (Barra da Tijuca) - Associação Britânica de Educação</li>
              <li>The British School of Rio de Janeiro (Urca) - Associação Britânica de Educação</li>
            </ul>
            <p className="text-sm text-[var(--muted)]">
              *Membership may change pending on annual participation and the approval of the majority of the
              remaining athletic directors (ADs) and heads of school.
            </p>
          </Section>

          {/* Article 2 */}
          <Section title="Article 2 – Tournament Site and Dates" boxed>
            <AlphaList items={[
              'The AASB National tournaments will be held at "Acampamento Nosso Recanto" with all participants being housed at the campsite.',
              'The tournament will generally be held in the months of October/November (Season 1 - Basketball, Soccer, and Cheer Sideline) and March-May (Season 2 - Futsal, Volleyball, Cheer Routine Competition and Softball).',
              'Participants should arrive at camp based on the communicated dates from the hosting school.',
              'The camp coordinator will organize the dormitory rotation according to the number of participants per school.',
              'The camp provides laundry service for the team uniforms.',
              'The camp emergency phone # is (35) 3655 1092 or whatsapp (11) 50907419. The office number in Sao Paulo is (011) 5090-7419. For further information check out the website at www.nr.com.br.',
            ]} />
          </Section>

          {/* Article 3 */}
          <Section title="Article 3 – Host and Co-Host Schools' Responsibilities" boxed>
            <p className="mb-3">The hosting schools will:</p>
            <AlphaList items={[
              'Provide the schedule of games and other events, e.g. meetings.',
              'Arrange and confirm the costs for the camp, awards, medical services, referees, and T-shirts, and any other services needed to the success of the tournament at least 2 months in advance. This includes making arrangements to ensure that emergency medical services are available for use throughout the duration of the event. Liaise with third-party providers to ensure that the AASB schools expectations and procedures are met.',
              'Provide the updated anchor document, including the AASB Athletics Constitution for all ADs, coaches, and team captains at least one month in advance of the tournament.',
              'Provide T-shirts for all participants that are at the expense of each school based on their order. (T-shirts for referees, camp monitors, medical team are optional).',
              'Communicate with a contracted company responsible for providing officials of the tournament the mission statement, rule modifications and expectations as hired staff while residing at the camp.',
              'Share the Protocol for AASB Athletic/Activity Trips and conduct the Child and Adolescent Child Protection check form with all third-party providers at any AASB event. Ensure proper enforcement throughout the event.',
              'Provide game balls and sports equipment if necessary. (suggestion: 3 for each soccer game; 2 for each basketball game, softball helmets, etc).',
              'Facilitate all meetings\' minutes, mediate conflict resolution and/or any interventions during the tournament.',
              'Plan and provide the master of ceremony for the following events: opening ceremony, cheerleading presentations, and closing ceremony.',
              'Bring a school administrator per tournament at each event that will serve in case there are any behavioral issues.',
              'Elaborate an AASB Event Report within the next two weeks after the event has taken place that will include the anchor document, event\'s agenda minutes, event\'s final standings and any behavioral incident report if necessary.',
              'Facilitate the organization of friendly games amongst the participating schools if possible and interest arises.',
            ]} />
          </Section>

          {/* Article 4 */}
          <Section title="Article 4 – Participating Schools' Responsibilities" boxed>
            <p className="mb-3">Participating schools will:</p>
            <AlphaList items={[
              'Submit team rosters to the hosting schools and to the camp, using the template sent by the host schools, at least 2 weeks prior to the tournament\'s starting date.\n  i. The camp requires that we provide a list of all participants and coaches with their birthdates, gender, and CPFs for insurance reasons. Passports are accepted for those without CPF/RG.\n  ii. T-shirt order must be completed 4 weeks prior due to ordering and shipping.',
              'Provide information about the estimated arrival time to the camp to NR.',
              'Communicate any special request with the camp with enough time in advance.',
              'Each school is responsible for bringing their first-aid kit, warm-up balls, and two sets of jerseys (light and dark).',
              'The Athletic Director from each school or any official representative, administrator, or teacher/administrator is expected to be present during the tournament and to attend all meetings.',
              'Each AD is responsible to ensure that all participants follow the tournament rules including curfew and to be present at the opening and awards ceremony.\n  i. Ensure that spectators abide by the tournament and camp rules, pay for their meals and that they remain in permitted areas (ie. coaches room is restricted to coaches and ADs).\n  ii. Visitors, including bus drivers, are not permitted to stay overnight at the camp.',
              'Each school should have at least one male and one female adult assigned to supervise their team during the tournament.',
              'The AD is to ensure that all coaches and participants of their respective teams are present at the awards ceremony as well as the cheerleading performance/competition.',
              'All schools must bring a folder with students\' medical information to be submitted to the medical staff.',
              'All schools must bring proper identification with pictures in case discrepancies occur.',
            ]} />
          </Section>

          {/* Article 5 */}
          <Section title="Article 5 – Eligibility and Participation Rules" boxed>
            <AlphaList items={[
              'Students enrolled in the regular, full-time program of the participating schools are eligible to participate in the tournament games and activities.',
            ]} />
            <div className="ml-6 mt-2 space-y-2 text-sm">
              <p>1. Varsity athletes can consist of any secondary student enrolled in the school.</p>
              <p>2. Middle School athletes:</p>
              <div className="ml-6 space-y-1">
                <p>a. Middle school athletes consist of any 6th-8th grade students enrolled in the school.</p>
                <p>b. Player(s) who is/are found to be ineligible will not be permitted to continue to participate in any further games and the team will forfeit all games in which the athlete in question participated and or awards lost. "Participation" in games is defined "as a player(s) whose name has been included on the game score sheet(s)."</p>
              </div>
              <p>3. A player(s) may leave the camp with special permission from the school AD but may NOT return except in situations involving official purposes such as SAT or vestibular testing, military service registration or medical reasons.</p>
              <p>4. Players must arrive before their first team's game to participate in the tournament.</p>
            </div>

            <p className="font-semibold mt-4 mb-2">B. Roster Sizes</p>
            <ol className="list-decimal list-inside space-y-1 text-sm ml-4">
              <li>Basketball teams can have a maximum of <strong>18</strong> players on the roster, but only 15 players can be part of each game. The coach can rotate players for every game.</li>
              <li>Soccer teams can have a maximum of <strong>25</strong> players on the roster, but only 22 players can be part of each game. The coach can rotate players for every game.</li>
              <li>Volleyball teams can have a maximum of <strong>18</strong> players on the roster, but only 15 players can be part of each game. The coach can rotate players for every game.</li>
              <li>Futsal teams can have a maximum of <strong>18</strong> players on the roster, but only 15 players can be part of each game. The coach can rotate players for every game.</li>
              <li>Cheerleading can have a maximum of <strong>30</strong> cheerleaders.</li>
              <li>Softball teams can have a maximum of <strong>19</strong> players on the roster. The coach can rotate players for every game.</li>
            </ol>

            <p className="font-semibold mt-4 mb-2">C. Chaperones</p>
            <p className="text-sm">Each school is responsible for ensuring that a male and female coach or chaperone is assigned to supervise the teams sleeping quarters for the duration of the tournament. These chaperones do not have to sleep in the room.</p>
          </Section>

          {/* Article 6 */}
          <Section title="Article 6 – Referees and Officials" boxed>
            <AlphaList items={[
              'The referees and officials should be members of each sport\'s official Federation and they must have full knowledge of our unique tournament rules and regulations.',
              'Referees and officials should be given the tournament rules (preferable in Portuguese) in advance.',
              'It is mandatory to have a meeting with the referees and coaches before the first games.',
              'The referees should be encouraged to explain their "calls" to the players for educational purposes but not to engage in a discussion or an argument. The referee\'s decision is final.',
              'Every other night, the host AD will meet with the referees to review and remind expectations.',
              'The number of referees needed for each sport is as follows:',
            ]} />
            <ol className="list-decimal list-inside space-y-1 text-sm ml-8 mt-2">
              <li>Soccer: 10 on site; minimum of 4 per game</li>
              <li>Basketball: 10 on site; minimum of 4 per game</li>
              <li>Volleyball: 8 on site, minimum of 3 per game</li>
              <li>Futsal: 8 on site; minimum of 3 per game</li>
              <li>Cheerleading - minimum of 2 judges</li>
              <li>Softball - 3 on site; minimum of 2 per game</li>
            </ol>
          </Section>

          {/* Article 7 */}
          <Section title="Article 7 – Costs" boxed>
            <AlphaList items={[
              'Each school should be responsible for their own transportation to and from the camp.\n  a. Arrival and dismissal should occur based on the request of NR.',
              'The camp charges a set fee for housing, food, and required insurance to be paid directly to the camp.\n- Each school is allowed one FREE adult or a portion of that cost for every 10 students. Example: if your school has 28 total number of students, then you pay 2.8 x the price and subtract this amount from the total cost.',
              'The host school must provide a tournament T-shirt.',
              'All participating schools should equally share the total cost for awards, referees, live streaming shared between the participating team), medical services, physiotherapy, and third-party camp fees.',
              'Host School should provide and bring new game balls to the tournament.',
              'The camp will provide housing for the referees.',
            ]} />
          </Section>

          {/* Article 8 */}
          <Section title="Article 8 – Awards" boxed>
            <p className="font-semibold underline mb-3">AASB Nationals Awards</p>
            <AlphaList items={[
              'The first, second, and third placed teams in each sport will receive a non-rotating trophy.',
              'The Final Four teams finishing 1st, 2nd, and 3rd in the Nationals will be given individual medals and trophies. The Final Four 4th place will be awarded a plaque. All Final Four awards will be handed to the deserving teams at the closing ceremony.',
              'The two first teams finishing Division 2, Division 3 and/if Division 4 will receive smaller medals and trophies that will be handed to them at the end of their final games.',
            ]} />
            <ul className="list-[lower-alpha] list-inside text-sm ml-8 mt-1 space-y-1">
              <li>28 for Soccer</li>
              <li>21 for Basketball</li>
              <li>21 for Volleyball</li>
              <li>33 for sideline Cheer &amp; Cheer Competition</li>
              <li>21 for Futsal</li>
              <li>19 for Softball</li>
            </ul>
            <div className="mt-3 space-y-3 text-sm">
              <p><strong>D.</strong> Sportsmanship Awards should be awarded to the boy and girl from each school's team with the highest number of green cards throughout the tournament.</p>
              <div className="ml-6 space-y-1">
                <p>a. AASB Green Card award</p>
                <p>b. Cheerleading Sportsmanship Award</p>
                <p>c. In the case of a tie, the AD will decide the winner.</p>
              </div>
              <p><strong>E.</strong> AASB MVP Award – schools will choose one player per sport (in which the school participates) to receive an award as the outstanding player of that sport representing that school. These outstanding players will be chosen by the other school's coaching staff.</p>
              <p><strong>F.</strong> The awards ceremony will take place immediately after the last games on Sunday. The cafeteria will open immediately after the awards ceremony.</p>
            </div>
          </Section>

          {/* Article 9 */}
          <Section title="Article 9 – Sports Rules" boxed>

            {/* Basketball */}
            <SportSection title="Basketball">
              <SubSection title="Middle School">
                <AlphaList items={[
                  'International FIBA rules will apply with games consisting of 4 x 8 minute (stop clock) quarters with a 5-minute half-time.',
                  'Each team consists of 15 players (all must be listed on the score sheet (súmula).',
                  'Overtime periods will be 3 minutes.',
                  'Boys will use the Penalty 7.8 Official size ball and the girls will use the Penalty 6.8 official size ball.',
                  'Tie Breaking Procedure (Group Stage)',
                ]} />
                <TieBreaking />
                <p className="text-sm mt-3"><strong>F. RECOMMENDATION:</strong> The leading team should not use a full court press if leading by more than 20 points. The ADs are responsible for communicating this to their coaches.</p>
              </SubSection>
              <SubSection title="Varsity">
                <AlphaList items={[
                  'International FIBA rules will apply with games consisting of 4 x 8 minute (stop clock) quarters with a 5-minute half-time.',
                  'Each team consists of 15 players (all must be listed on the score sheet (súmula).',
                  'Overtime periods will be 3 minutes.',
                  'Boys will use the Penalty 7.9 Official size ball and the girls will use the Penalty 6.9 official size ball.',
                  'Tie Breaking Procedure (Group Stage)',
                ]} />
                <TieBreaking />
                <p className="text-sm mt-3"><strong>F. RECOMMENDATION:</strong> The leading team should not use a full court press if leading by more than 20 points.</p>
              </SubSection>
            </SportSection>

            {/* Volleyball */}
            <SportSection title="Volleyball">
              <SubSection title="Middle School">
                <AlphaList items={[
                  'International rules will apply with the exception of unlimited regular substitutions.\n  a. The net height is 2.20 m for girls and 2.24 m for boys.\n  b. Jump serve is permitted.',
                  'The match will be a best of 3 sets where the first 2 sets are played to 25 points and the third set to 15 points.',
                  'Coaches will have 2 timeouts in each set, but officials will not call the technical time-out (points 8 and 16).',
                  'The official ball is the PENALTY 8.1 PRO latest edition.',
                  'Points will be awarded as follows:\n  - Win (2x0 or 2x1) – 3 points\n  - Loss (1x2) – 1 point\n  - Loss (0x2) – 0 point',
                  'Tie Breaking Procedure: In the case of a tie after the round robin, the following criteria will be used.',
                  'RECOMMENDATION: After scoring 8 consecutive points with the overhand serve, it is recommended to switch to an underhand serve.',
                ]} />
              </SubSection>
              <SubSection title="Varsity">
                <AlphaList items={[
                  'International rules will apply with the exception of unlimited regular substitutions.',
                  'The match will be a best of 3 sets where the first 2 sets are played to 25 points and the third set to 15 points.',
                  'Coaches will have 2 timeouts in each set, but officials will not call the technical time-out (points 8 and 16).',
                  'The official ball is the PENALTY 8.1 PRO latest edition.',
                  'Net Height is for Girls - 2.24 meter and Boys - 2.43 meter',
                  'Points will be awarded as follows:\n  - Win (2x0 or 2x1) – 3 points\n  - Loss (1x2) – 1 point\n  - Loss (0x2) – 0 point',
                  'Tie Breaking Procedure: Same criteria as Middle School.',
                ]} />
              </SubSection>
            </SportSection>

            {/* Soccer */}
            <SportSection title="Soccer">
              <SubSection title="Middle School">
                <AlphaList items={[
                  'Games will be 2 x 25 minutes with a 5-minute halftime.',
                  'The official ball will be the latest version of the good quality "Penalty" ball - Latest edition of S11 Penalty Pro.',
                  'All players MUST wear shin guards and NO metal cleats are permitted.',
                  'FIFA (IFAB) Laws will apply with the following exceptions:\n  a. unlimited substitutions.\n  b. If the game is tied after regulation time, 3 penalty kicks will determine the outcome. (If teams are still tied it goes to sudden death).\n  c. The winning team receives 3 points and the losing team 0 points after regulation time. However, 2 points are awarded for a win after the penalty kicks and 1 point for a loss after the penalty kicks.\n  d. For National play-off games teams go straight to 5 penalty kicks (3 kicks for all other divisions).\n  e. For the Nationals medal games (only), if there is a tie at the end of regulation, we will play an overtime period lasting 2x5 minutes. Followed by penalty shootouts (5 kicks) if the tie continues.\n  f. All other placement games will have 3 penalty kicks in case of a tie (No extra time).\n  g. If a player(s) receives a RED card or his/her second yellow in the same game, he/she will be ejected from the game and not be permitted to participate in the next game.\n  h. If the player is ejected for receiving the card, he/she is not eligible for the sportsmanship award.\n  i. If a player receives a yellow card he/she must sit by the score table for 3 minutes.',
                  'The winning team receives 3 points and the losing team 0 points after regulation time.',
                  'Coaches must remain in the assigned area of their own side (half).',
                  'Soccer teams can have a maximum of 25 players on the roster but only 22 players can be part of each game.',
                  'Tie Breaking Procedure: In case of a tie after the round-robin on points, the following criteria will be used.',
                ]} />
              </SubSection>
              <SubSection title="Varsity">
                <AlphaList items={[
                  'Games will be 2 x 30 minutes with a 10-minute halftime.',
                  'The official ball will be the latest version of the good quality "Penalty" ball. Latest edition of S11 Penalty Eckonit.',
                  'All players MUST wear shin guards and NO metal cleats are permitted.',
                  'FIFA (IFAB) Laws will apply with the following exceptions (same as Middle School with addition of yellow card accumulation rules).',
                  'Yellow cards will accumulate throughout the tournament until the quarterfinal stage. Any player who receives two yellow cards in different matches prior to or including the quarterfinal will be suspended for the next match. Single yellow cards are cleared after the quarter final.',
                ]} />
              </SubSection>
            </SportSection>

            {/* Futsal */}
            <SportSection title="Futsal">
              <SubSection title="Middle School">
                <AlphaList items={[
                  'FIFA (IFAB) Laws apply with games of 2 x 15 minute halves (stopped clock). The official ball will be the latest version of the good quality "Penalty" ball. Latest edition of MAX 1000.',
                  'All players MUST wear shin guards and NO metal cleats are permitted.',
                  'FIFA (IFAB) Laws will apply with the following exceptions:\n  a. unlimited substitutions.\n  b. If the game is tied after regulation time, 3 penalty kicks will determine the outcome.\n  c. The winning team receives 3 points; 2 points for a win after penalty kicks; 1 point for a loss after penalty kicks.\n  d. For National play-off games teams go straight to 5 penalty kicks.\n  e. For Nationals medal games, if tied, overtime lasting 2x5 minutes, then penalty shootouts.\n  f. All other placement games will have 3 penalty kicks in case of a tie.\n  g. RED card or second yellow = ejected from game and not permitted in next game.',
                  'The winning team receives 3 points and the losing team 0 points after regulation time.',
                  'Coaches must remain in the assigned area of their own side (half).',
                  'Futsal teams can have a maximum of 18 players on the roster but only 15 players can be part of each game.',
                  'Tie Breaking Procedure: Same criteria as Soccer.',
                ]} />
              </SubSection>
              <SubSection title="Varsity">
                <AlphaList items={[
                  'FIFA (IFAB) Laws apply with games of 2 x 16 minute halves (stopped clock).',
                  'Ball: Penalty Max 1000 latest edition.',
                  'All players MUST wear shin guards and NO metal cleats are permitted.',
                  'Same exceptions as Middle School Futsal apply.',
                  'Futsal teams can have a maximum of 15 players on the roster.',
                  'Tie Breaking Procedure: Same criteria as Soccer.',
                ]} />
              </SubSection>
            </SportSection>

            {/* Cheerleading */}
            <SportSection title="Cheerleading">
              <AlphaList items={[
                'Cheerleading competitions will take place in both semesters:\n  Semester 1: Sideline Competition, Optional Instructional classes, Optional Cheer Presentation.\n  Semester 2: Cheerleading Routine Competition.',
                'Rules Books: Cheerleading Rule Book, Competition Rubric, Sideline Cheer Rules.',
              ]} />
            </SportSection>

            {/* Softball */}
            <SportSection title="Softball">
              <AlphaList items={[
                'With the following exceptions, rules for softball will be those printed in the American Slow-Pitch Softball Rulebook.',
                'Mandatory baseball caps or visors for each team member (all the same cap/visor).',
                'Middle School Co-ed will use 11" softball. Varsity Co-ed will use 12" softball. (Yellow balls)',
                'The elongated home plate will measure 85 cm x 43 cm.',
                'A regulation-sized home plate will be clearly painted in white on the front of the elongated home plate.',
                'Double safety base must be used at first base, for both boys and girls.',
                'Distances between softball bases are 65 ft. (19.81m) for boys and girls. Pitching rubber (mat) is at 46 ft. (14.02m) for boys and 40 ft. (12.192 m) for girls.',
                'Fence distance should be 285 Ft. (85m) for boys and 270 Ft. (79m) for the girls field.',
                'A runner must touch the regulation-sized home plate to score a run.',
                'A ball pitched with an arc of at least 6 feet / 1.82 m (there is no maximum arc) that strikes the elongated home plate without being touched in flight by a person or object is a strike.',
                'The "extra-player" (EP) will be allowed.',
                'The length of a game shall be 6 innings, with the exception that no new inning may start after one hour and twenty minutes of game time has elapsed.',
                'Should one team be leading by 15 or more runs in Softball and the losing team has had at least four full innings at bat, the game will be terminated unless both coaches agree to continue.',
                'Maximum number of athletes per team: 19.',
              ]} />
            </SportSection>
          </Section>

          {/* Article 10 */}
          <Section title="Article 10 – Tournament Rules of Conduct" boxed>
            <p className="font-bold text-center mb-4">RULES OF CONDUCT AND PROCEDURES</p>
            <p className="mb-4">
              All AASB schools have mission statements that speak of high academic expectations and
              high expectations for character development and community building. We believe
              extra-curricular trips demand an increased layer of behavioral expectations and that the
              elements of risk are heightened for teachers, administrators, parents, students, and for the
              school due to the elevated risk inherent in taking several students off campus.
            </p>

            <p className="font-semibold mb-2">Diversity, Equity and Inclusion Statement</p>
            <p className="mb-4 text-sm">
              The Association of American Schools in Brazil (AASB) is committed to diversity, inclusion, and
              gender equity amongst its members, event participants, volunteers, and community.
              AASB welcomes all individuals to participate in our event offerings. We have zero tolerance
              for any behaviors which discriminate against anyone through language or interactions that
              target their identity or culture in any way.
            </p>

            <p className="font-semibold mb-2">Prohibited Items and Activities</p>
            <p className="mb-4 text-sm">
              The possession, use, or distribution of tobacco, alcohol, drugs, vaporizers, or weapons is strictly
              prohibited. Violators will not be allowed to continue participating in the tournament and may
              be sent home at the family's expense. Fighting, provoking fights, or encouraging fights is also
              strictly prohibited.
            </p>

            <p className="font-semibold mb-2">Camp and Accommodation Rules</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Participants must remain within designated and well-lit areas. Leaving the camp without permission is not allowed.</li>
              <li>Curfew is set at 10:30 p.m., with lights out at 11:00 p.m.</li>
              <li>Cabins must be kept clean and organized. Entering other teams' cabins is prohibited.</li>
              <li>Swimming and boating are allowed only under adult supervision. Jumping into the lake and using the "Sem Noção" slide are not allowed.</li>
              <li>No initiation or mistreating anyone attending the camp for the first time (Hazing).</li>
            </ul>

            <p className="font-semibold mb-2">Conduct During Meals</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Please keep the areas clean by clearing your dishes after eating.</li>
              <li>For everyone's safety, please wear appropriate footwear — cleats and bare feet are not allowed in the cafeteria or gymnasium.</li>
              <li>Shirts should be worn at all times in dining and sports areas.</li>
              <li>Help maintain a calm and safe atmosphere by using tables and chairs properly and keeping noise at a considerate level.</li>
            </ul>

            <p className="font-semibold mb-2">Sportsmanship and Behavior</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Always demonstrate good sportsmanship and respectful behavior.</li>
              <li>Use encouraging and supportive language, and respect referees and officials throughout the event.</li>
              <li>Spectators are welcome to cheer from the designated areas opposite the team benches and score tables. Do not cheer against anyone, only in favor of any team.</li>
              <li>Only players, coaches, and authorized personnel are allowed near the benches and scoring areas.</li>
              <li>Students must keep their phones in their rooms and may only use them in designated areas and at times defined by each school.</li>
            </ul>

            <p className="font-semibold mb-2">Music and Noise Regulations</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Personal speakers and loud music are prohibited in public areas (e.g., bleachers, cafeteria).</li>
              <li>No noisemakers (e.g., drums, sound boxes, horns, whistles, megaphones, trumpets) are allowed.</li>
            </ul>

            <p className="font-semibold mb-2">Consequences of Violations: Students</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li><strong>Level I - Minor Infractions:</strong> (e.g., curfew violation, poor sportsmanship) result in suspension from the next scheduled game.</li>
              <li><strong>Level II - Major Infractions:</strong> (e.g., leaving the venue without permission, possession of prohibited substances or weapons, abuse, hazing) result in immediate ineligibility from the current event, early return home at the parents' expense, and exclusion from future events for up to one year.</li>
              <li><strong>Note:</strong> Repeated Level 1 Infractions may result in Level II consequences.</li>
            </ul>

            <p className="font-semibold mb-2">Responsibilities of Students and Participants</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Treat everyone with kindness and respect.</li>
              <li>Follow all established rules and guidelines to ensure a smooth and enjoyable event.</li>
              <li>Use positive and appropriate language at all times.</li>
              <li>Maintain a peaceful and cooperative attitude.</li>
              <li>Respect curfews and stay within the areas assigned to participants.</li>
            </ul>

            <p className="font-semibold mb-2">Responsibilities of Parents and Spectators</p>
            <p className="text-sm mb-2">Parents/Visitors must sign the AASB code of conduct upon entry to the camp.</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Be familiar with the tournament rules and the AASB code of conduct.</li>
              <li>Encourage positive behavior and respect for all participants.</li>
              <li>Use positive and appropriate language at all times.</li>
              <li>Support fair play and sportsmanship at all times.</li>
              <li>Thank coaches, chaperones, and officials for their efforts.</li>
            </ul>

            <p className="font-semibold mb-2">Responsibilities of Coaches</p>
            <ul className="list-disc list-inside text-sm space-y-1 mb-4 ml-4">
              <li>Inspire by modeling positive behavior and encouraging good sportsmanship.</li>
              <li>Communicate with respect and kindness toward players, officials, and spectators.</li>
              <li>Honor and support the decisions of referees and officials.</li>
              <li>Actively contribute to creating a safe, positive, and encouraging environment.</li>
            </ul>

            <p className="font-semibold mb-2">Responsibilities of Athletic Directors (ADs)</p>
            <ul className="list-disc list-inside text-sm space-y-1 ml-4">
              <li>Ensure that all participants follow the AASB Code of Conduct, and tournament rules, including curfew, and are present at the awards ceremony.</li>
              <li>Ensure that their school's parents and non-participating students comply with tournament rules.</li>
              <li>Provide a folder with a copy of each student's medical information.</li>
              <li>Share all required information from the Host within the requested timeline.</li>
            </ul>
          </Section>

        </div>
      </div>
    </div>
  )
}

// ── Sub-components ────────────────────────────────────

function Section({ title, children, boxed }: { title: string; children: React.ReactNode; boxed?: boolean }) {
  return (
    <div className="mb-10">
      <div className={`mb-4 ${boxed ? 'border border-[var(--text)] p-3 text-center' : ''}`}>
        <h2 className="font-heading font-bold text-lg text-[var(--text)]">{title}</h2>
      </div>
      <div className="font-body text-sm text-[var(--text)] leading-relaxed space-y-2">
        {children}
      </div>
    </div>
  )
}

function SportSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <h3 className="font-heading font-bold text-base text-[var(--text)] underline text-center mb-4">{title}</h3>
      {children}
    </div>
  )
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <p className="font-semibold mb-2">{title}</p>
      {children}
    </div>
  )
}

function AlphaList({ items }: { items: string[] }) {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2 text-sm">
          <span className="font-semibold flex-shrink-0">{letters[i]}.</span>
          <p className="whitespace-pre-line">{item}</p>
        </div>
      ))}
    </div>
  )
}

function TieBreaking() {
  return (
    <div className="ml-6 text-sm space-y-1 mt-2">
      <p>a. If two teams are tied and have played each other, the winner of that match will be ranked higher.</p>
      <div className="ml-6">
        <p>i. If the teams did not face each other, the ranking will be determined by:</p>
        <div className="ml-6">
          <p>1. The team that conceded the fewest points overall.</p>
          <p>2. If still tied, the team with the better point differential across all games.</p>
        </div>
      </div>
      <p>b. Three teams – the point differential in the games among the 3 tied teams only.</p>
      <p>c. If a tie continues, the team with the least points suffered between the tied teams.</p>
    </div>
  )
}