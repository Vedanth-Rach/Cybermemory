import { Alert } from '../types/alert';
import { InvestigationStep } from '../types/incident';
import { HindsightMemory } from '../types/memory';

class AiService {
  /**
   * Generates AI assessment, confidence score, and numbered investigation steps
   * grounded in Hindsight Memory.
   */
  public async analyzeAlert(alert: Alert): Promise<{
    assessment: string;
    confidence: number;
    steps: InvestigationStep[];
  }> {
    // Slight simulated AI inference delay
    await new Promise(resolve => setTimeout(resolve, 450));

    if (alert.title.includes('Login') || alert.incidentId === 'INC-2026-00421') {
      return {
        assessment: 'Multiple authentication failures against a privileged account from an external IP suggest a possible brute-force or credential-stuffing attempt.',
        confidence: 91,
        steps: [
          {
            id: 'step-01',
            stepNumber: '01',
            title: 'Validate source',
            description: `Check whether ${alert.sourceIp} is a known corporate or trusted IP.`,
            detailedGuidance: `Query IP threat intelligence database and GeoIP registry. Verify if ${alert.sourceIp} belongs to a recognized partner ASN or a known Tor exit/bulletproof VPN network.`,
            status: 'completed',
            commandSuggestion: `whois ${alert.sourceIp} | grep -E "OrgName|NetRange|CIDR"`,
            evidenceFound: `IP registered to AS49870 (Hosting Solutions LLC). Classified as High Risk VPN/Proxy by ThreatGraph.`
          },
          {
            id: 'step-02',
            stepNumber: '02',
            title: 'Review authentication logs',
            description: 'Search for successful authentication attempts following the failed attempts.',
            detailedGuidance: 'Check Windows Security Event ID 4624 (Successful Logon) immediately following the Event ID 4625 bursts. Historical incident INC-2026-00317 showed attackers succeeded on attempt #28.',
            status: 'completed',
            commandSuggestion: `Get-WinEvent -FilterHashtable @{LogName='Security';Id=4624;StartTime=(Get-Date).AddHours(-1)} | Where-Object {$_.Properties[18].Value -eq '${alert.sourceIp}'}`,
            evidenceFound: 'Found 1 successful Event 4624 logon at 2026-09-29 20:47:14 UTC from 185.73.22.41 for admin@company.local.'
          },
          {
            id: 'step-03',
            stepNumber: '03',
            title: 'Check account activity',
            description: 'Review recent privilege changes and unusual account activity.',
            detailedGuidance: 'Inspect directory modifications, group assignments (e.g. Domain Admins, Schema Admins), and any newly created scheduled tasks or service principals under this account identity.',
            status: 'in_progress',
            commandSuggestion: `Get-ADPrincipalGroupMembership admin | select name`,
            evidenceFound: 'No group membership changes detected in the past 60 minutes. Active Kerberos TGT ticket requested.'
          },
          {
            id: 'step-04',
            stepNumber: '04',
            title: 'Investigate affected endpoint',
            description: `Check ${alert.host} for suspicious processes, persistence mechanisms, or lateral movement.`,
            detailedGuidance: `Execute EDR live response query on ${alert.host}. Scan for spawned cmd.exe/powershell.exe under LSASS or WsmProvHost, and verify registry Run keys and scheduled tasks.`,
            status: 'pending',
            commandSuggestion: `edr_cli query --host ${alert.host} --detect-persistence --process-tree`,
            evidenceFound: 'Pending execution of live memory inspection on Domain Controller DC-01.'
          },
          {
            id: 'step-05',
            stepNumber: '05',
            title: 'Assess credential exposure',
            description: 'Determine whether the targeted credentials may have been compromised.',
            detailedGuidance: 'Cross-reference admin@company.local against commercial dark web breach databases and recent corporate credential leak telemetry.',
            status: 'pending',
            commandSuggestion: `vault_audit check-breach --identity ${alert.target}`,
            evidenceFound: 'Password hash matched leaked combo list circulating in underground Telegram channels.'
          }
        ]
      };
    }

    // Generic fallback for other alerts
    return {
      assessment: `AI triage indicates active anomaly on ${alert.host}. Cross-referencing against ${alert.memoryMatchCount} historical cases suggests potential threat requiring containment.`,
      confidence: 86,
      steps: [
        {
          id: 'step-01',
          stepNumber: '01',
          title: 'Isolate source host',
          description: `Verify telemetry from ${alert.source} and assess need for network quarantine.`,
          detailedGuidance: 'Check host containment readiness and active network connections.',
          status: 'pending'
        },
        {
          id: 'step-02',
          stepNumber: '02',
          title: 'Correlate telemetry logs',
          description: 'Gather system event logs for 30 minutes before and after alert timestamp.',
          detailedGuidance: 'Look for parent process execution and anomalous child process spawning.',
          status: 'pending'
        },
        {
          id: 'step-03',
          stepNumber: '03',
          title: 'Execute historical playbook',
          description: 'Apply remediations learned from similar past incidents in Hindsight Memory.',
          detailedGuidance: 'Review past actions taken in similar scenarios.',
          status: 'pending'
        }
      ]
    };
  }

  /**
   * Floating AI Copilot conversational response engine.
   * Leverages Hindsight Memory citations.
   */
  public async askCopilot(
    prompt: string,
    currentAlert?: Alert,
    memories?: HindsightMemory[]
  ): Promise<{ reply: string; citedIncidentIds: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 300));

    const lower = prompt.toLowerCase();

    if (lower.includes('seen this type of login attack before') || lower.includes('seen this before') || lower.includes('have we seen')) {
      return {
        reply: 'Yes. I found 5 related incidents in organizational memory. The most similar incident occurred 12 days ago (INC-2026-00317, 94% similarity) and involved compromised administrator credentials originating from the same hosting range. In that case, the attacker successfully logged in on the 28th attempt before credentials were reset.',
        citedIncidentIds: ['INC-2026-00317', 'INC-2026-00281', 'INC-2026-00192']
      };
    }

    if (lower.includes('what should i check first') || lower.includes('check first') || lower.includes('recommendation')) {
      return {
        reply: 'Start by reviewing successful authentication events (Event ID 4624) following the failed attempts. Two previous incidents (INC-2026-00317 and INC-2026-00281) showed that successful login activity was the strongest indicator of credential compromise, occurring within 6 minutes of the initial brute-force burst.',
        citedIncidentIds: ['INC-2026-00317', 'INC-2026-00281']
      };
    }

    if (lower.includes('explain') && lower.includes('317')) {
      return {
        reply: 'Incident INC-2026-00317 has a 94% similarity score because of three key factors: (1) Same autonomous system origin (AS49870), (2) Identical target account (admin@company.local), and (3) Rapid succession of 25+ failed NTLM events followed by Kerberos negotiation. The analyst in that incident successfully mitigated the threat by enforcing FIDO2 hardware MFA and rotating all administrative credentials.',
        citedIncidentIds: ['INC-2026-00317']
      };
    }

    if (lower.includes('ciso') || lower.includes('summary')) {
      return {
        reply: `Executive Briefing for CISO: Threat detected against Domain Controller ${currentAlert?.host || 'DC-01'} from IP ${currentAlert?.sourceIp || '185.73.22.41'}. Utilizing Hindsight Memory, CyberMemory AI identified a 94% match to INC-2026-00317. Rapid containment playbook initiated: perimeter IP block, account credential invalidation, and FIDO2 MFA verification underway. Estimated risk reduction: 88%.`,
        citedIncidentIds: ['INC-2026-00317']
      };
    }

    // Default contextual answer
    return {
      reply: `Based on Hindsight Memory analysis for ${currentAlert ? currentAlert.incidentId : 'current alerts'}, I have retrieved ${memories?.length || 5} similar cases. The primary pattern is credential spraying against administrative endpoints. I recommend validating whether ${currentAlert?.sourceIp || '185.73.22.41'} has achieved any successful sessions, and immediately preparing credential invalidation playbooks.`,
      citedIncidentIds: ['INC-2026-00317', 'INC-2026-00281']
    };
  }
}

export const aiService = new AiService();
