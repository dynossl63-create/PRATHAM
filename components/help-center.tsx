"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import {
  HelpCircle,
  Search,
  BookOpen,
  ChevronRight,
  ArrowLeft,
  Clock,
  Star,
  Lightbulb,
  Settings,
  AlertCircle,
  Sparkles
} from "lucide-react"
import React from "react"

interface HelpArticle {
  id: string
  title: string
  description: string
  category: "getting-started" | "features" | "troubleshooting" | "advanced"
  readTime: string
  popular: boolean
  content: string
  steps?: string[]
  tips?: string[]
  relatedArticles?: string[]
}

const categoryIcons = {
  "getting-started": Lightbulb,
  features: Sparkles,
  troubleshooting: AlertCircle,
  advanced: Settings,
}

const categoryColors = {
  "getting-started": "bg-green-500/10 text-green-600 border-green-500/20",
  features: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  troubleshooting: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  advanced: "bg-purple-500/10 text-purple-600 border-purple-500/20",
}

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const helpArticles: HelpArticle[] = [
    {
      id: "1",
      title: "Understanding Your Achievement Score",
      description: "Learn how achievement points are calculated and what activities contribute to your score.",
      category: "getting-started",
      readTime: "3 min",
      popular: true,
      content: `Your Achievement Score is the cornerstone of PRATHAM, reflecting your academic journey and accomplishments. This comprehensive metric considers various factors to provide a holistic view of your educational progress.

## How Achievement Points Are Calculated

Your achievement score is calculated using a weighted algorithm that considers:

### Core Activities (70% of total score)
- Certificates Earned: Each verified certificate contributes 50-200 points based on difficulty and recognition level
- Academic Performance: GPA and course completion rates factor into your base score
- Research Publications: Peer-reviewed papers and conference presentations carry high weight
- Project Completions: Capstone projects, internships, and practical work

### Engagement Activities (20% of total score)
- Event Participation: Workshops, seminars, and conferences you attend
- Leadership Roles: Student government, club leadership, and volunteer coordination
- Peer Collaboration: Group projects and team-based achievements
- Community Service: Social impact activities and volunteer work

### Excellence Bonuses (10% of total score)
- Competition Wins: Hackathons, academic competitions, and contests
- Innovation Projects: Patents, startup participation, and creative works
- Mentorship: Teaching or mentoring junior students
- Industry Recognition: Awards and external acknowledgments

## Understanding Your Rank

Your rank is calculated relative to peers in your:
- Department/Major
- Academic year/level
- Institution
- Regional cohort (for government analytics)

## Tips to Improve Your Score

1. Diversify Your Activities: Don't focus only on academics - engage in extracurriculars
2. Seek Verification: Ensure all your achievements are properly documented and verified
3. Participate Actively: Attend events and workshops relevant to your field
4. Lead Initiatives: Take leadership roles in projects and organizations
5. Build Your Portfolio: Regularly update your digital portfolio with new achievements`,
      steps: [
        "Navigate to your dashboard to view your current achievement score",
        "Click on the score breakdown to see detailed point distribution",
        "Review each category to understand your strengths and areas for improvement",
        "Use the recommendations panel to find new opportunities",
        "Track your progress over time using the analytics charts",
      ],
      tips: [
        "Achievement scores are updated in real-time as new activities are verified",
        "Quality over quantity - focus on meaningful achievements rather than many small ones",
        "Your rank may fluctuate as peers also earn achievements - focus on personal growth",
        "Use the goal-setting feature to target specific score improvements",
      ],
      relatedArticles: ["3", "5"],
    },
    {
      id: "2",
      title: "How to Verify Your Certificates",
      description: "Step-by-step guide to certificate verification and blockchain security features.",
      category: "features",
      readTime: "5 min",
      popular: true,
      content: `PRATHAM uses advanced blockchain technology to ensure your certificates are tamper-proof and globally verifiable. This system provides unprecedented security and trust for your academic credentials.

## Understanding Certificate Verification

Every certificate in PRATHAM goes through a multi-layer verification process:

### Institutional Verification
- Source Authentication: Certificates are directly linked to issuing institutions
- Digital Signatures: Each certificate contains cryptographic signatures from authorized personnel
- Metadata Validation: Course details, dates, and grades are cross-verified with institutional records

### Blockchain Security
- Immutable Records: Once verified, certificates cannot be altered or deleted
- Distributed Ledger: Your credentials exist on multiple nodes, ensuring permanent availability
- Smart Contracts: Automated verification rules ensure consistency and prevent fraud
- Hash Verification: Each certificate has a unique digital fingerprint

### Third-Party Integration
- Industry Partners: Major employers can directly verify credentials through our API
- Government Recognition: Compliance with national education databases
- International Standards: Alignment with global credential verification frameworks

## How to Add and Verify Certificates

### Upload Process
1. Navigate to your Certificate Gallery
2. Click "Add New Certificate"
3. Upload high-quality scans or digital copies
4. Fill in all required metadata (course name, institution, date, grade)
5. Submit for verification

### Verification Stages
- Automatic Scan: AI checks format, signatures, and basic information
- Institution Review: The issuing institution confirms authenticity
- Blockchain Recording: Verified certificates are permanently recorded
- Quality Assurance: Final human review for complex cases

### Verification Timeline
- Instant: Digital certificates from partner institutions
- 24-48 hours: Standard paper certificates
- 3-5 days: Certificates requiring manual verification
- 7-14 days: International or non-partner institution certificates

## Verification Status Indicators

- ðŸŸ¢ Verified: Full blockchain verification complete
- ðŸŸ¡ Pending: Under review by institution
- ðŸ”µ Processing: AI analysis in progress
- ðŸ”´ Rejected: Issues found, requires resubmission
- âšª Draft: Saved but not yet submitted

## Troubleshooting Verification Issues

### Common Problems
- Poor Image Quality: Ensure scans are clear and high-resolution
- Missing Information: Complete all required fields accurately
- Institution Not Found: Contact support to add new institutions
- Date Discrepancies: Verify all dates match official records

### Quick Fixes
- Re-upload with better image quality
- Double-check all entered information
- Contact your institution's registrar for official digital copies
- Use the "Request Institution Addition" feature for new institutions`,
      steps: [
        "Go to Certificate Gallery in your dashboard",
        "Click 'Add New Certificate' button",
        "Upload clear, high-quality images or PDFs",
        "Fill in all certificate details accurately",
        "Submit for verification and wait for confirmation",
        "Check verification status in your gallery",
        "Share verified certificates with employers or institutions",
      ],
      tips: [
        "Upload certificates as soon as you receive them for faster processing",
        "Keep original certificates safe - digital copies are for verification only",
        "Verified certificates can be shared via secure links with employers",
        "Set up notifications to know when verification is complete",
        "Use the bulk upload feature for multiple certificates",
      ],
      relatedArticles: ["3", "1"],
    },
    {
      id: "3",
      title: "Setting Up Your Digital Portfolio",
      description: "Create a professional portfolio using your verified achievements and certificates.",
      category: "getting-started",
      readTime: "7 min",
      popular: false,
      content: `Your digital portfolio is your professional showcase, combining all your verified achievements into a compelling narrative that demonstrates your skills, growth, and potential to employers, graduate schools, and professional networks.

## What Makes a Great Digital Portfolio

### Essential Components
- Professional Summary: A compelling overview of your academic journey and career goals
- Achievement Timeline: Chronological display of major milestones and accomplishments
- Verified Certificates: All your blockchain-verified credentials in one place
- Project Showcase: Detailed descriptions of significant projects with outcomes
- Skills Matrix: Visual representation of your competencies and proficiency levels
- Recommendations: Testimonials from professors, employers, and peers

### Portfolio Sections

#### 1. Personal Brand
- Professional headshot and contact information
- Elevator pitch and career objectives
- Links to professional social media and personal website
- Core values and professional philosophy

#### 2. Academic Excellence
- GPA and academic honors
- Relevant coursework and specializations
- Research projects and publications
- Academic awards and scholarships

#### 3. Professional Experience
- Internships and work experience
- Leadership roles and responsibilities
- Volunteer work and community service
- Entrepreneurial ventures and side projects

#### 4. Skills and Competencies
- Technical skills with proficiency levels
- Soft skills with examples
- Language proficiencies
- Industry-specific knowledge

#### 5. Achievements and Recognition
- Competition wins and rankings
- Certificates and professional development
- Media mentions and publications
- Speaking engagements and presentations

## Building Your Portfolio Step by Step

### Phase 1: Foundation (Week 1)
- Set up your basic profile information
- Upload a professional photo
- Write your professional summary
- Import verified certificates

### Phase 2: Content Development (Week 2-3)
- Document all major projects with details
- Add work experience and internships
- Include volunteer work and leadership roles
- Create your skills assessment

### Phase 3: Enhancement (Week 4)
- Gather recommendations from mentors
- Add multimedia content (videos, presentations)
- Optimize for search and discoverability
- Review and refine content

### Phase 4: Maintenance (Ongoing)
- Regular updates with new achievements
- Seasonal review and content refresh
- Analytics review and optimization
- Network growth and engagement

## Portfolio Customization Options

### Templates and Themes
- Academic: Clean, scholarly design for graduate school applications
- Corporate: Professional layout for business careers
- Creative: Dynamic design for design and media fields
- Technical: Code-focused for software and engineering roles
- Custom: Fully customizable design options

### Privacy and Sharing Controls
- Public: Visible to everyone with search engine indexing
- Private: Only accessible via secure link
- Selective: Different visibility levels for different sections
- Professional Networks: Share with specific groups or individuals

## Advanced Features

### Interactive Elements
- 3D Project Galleries: Immersive showcase of your work
- Video Introductions: Personal video messages for different audiences
- Interactive Timelines: Clickable journey through your achievements
- Skills Animations: Dynamic visualization of competency development

### Analytics and Insights
- Visitor Analytics: See who's viewing your portfolio
- Engagement Metrics: Track which sections generate most interest
- Geographic Distribution: Understand your global reach
- Conversion Tracking: Monitor application and interview requests

## Best Practices for Portfolio Success

### Content Strategy
- Tell Your Story: Create a narrative arc showing growth and development
- Quantify Impact: Use numbers and metrics to demonstrate results
- Show, Don't Tell: Use examples and evidence rather than claims
- Keep It Current: Regular updates show ongoing development

### Technical Optimization
- Mobile Responsive: Ensure great experience on all devices
- Fast Loading: Optimize images and multimedia for quick access
- SEO Friendly: Use keywords relevant to your target opportunities
- Accessibility: Make content accessible to all users

### Professional Presentation
- Consistent Branding: Use consistent colors, fonts, and style
- High-Quality Media: Professional photos and well-produced videos
- Error-Free Content: Proofread all text carefully
- Regular Backups: Keep copies of your portfolio content`,
      steps: [
        "Access the Portfolio Builder from your main dashboard",
        "Choose a template that matches your career goals",
        "Complete your professional profile and summary",
        "Add all verified certificates and achievements",
        "Document your projects with detailed descriptions",
        "Upload supporting media (images, videos, documents)",
        "Set privacy settings and sharing preferences",
        "Preview and publish your portfolio",
        "Share your portfolio link with potential employers",
      ],
      tips: [
        "Update your portfolio monthly with new achievements and experiences",
        "Use high-quality, professional photos and media",
        "Tailor different versions for different types of opportunities",
        "Include quantifiable results and impacts in your descriptions",
        "Get feedback from mentors and career services before publishing",
      ],
      relatedArticles: ["1", "2"],
    },
    {
      id: "4",
      title: "Understanding Compliance Metrics",
      description: "For administrators: How NAAC and NIRF compliance scores are calculated.",
      category: "advanced",
      readTime: "10 min",
      popular: false,
      content: `PRATHAM's compliance tracking system provides comprehensive monitoring and reporting for institutional accreditation requirements, specifically designed to support NAAC (National Assessment and Accreditation Council) and NIRF (National Institutional Ranking Framework) compliance.

## NAAC Compliance Framework

### Seven Criteria Overview
PRATHAM automatically tracks and calculates metrics across all seven NAAC criteria:

#### 1. Curricular Aspects (150 points)
- Curriculum Design: Innovation in syllabus and teaching methods
- Academic Flexibility: Choice-based credit system implementation
- Feedback Integration: Student and employer feedback incorporation
- Skill Development: Soft skills and employability enhancement programs

#### 2. Teaching-Learning and Evaluation (350 points)
- Student Diversity: Admission process and student demographics
- Faculty-Student Ratio: Optimal learning environment maintenance
- Learning Outcomes: Achievement and assessment of program objectives
- Digital Learning: Technology integration in education delivery

#### 3. Research, Innovations and Extension (400 points)
- Research Publications: Quality and quantity of faculty/student research
- Innovation Ecosystem: Incubation centers and startup support
- Extension Activities: Community engagement and social responsibility
- Collaborative Research: Industry and institutional partnerships

#### 4. Infrastructure and Learning Resources (100 points)
- Physical Infrastructure: Classrooms, laboratories, and facilities
- Digital Infrastructure: IT resources and connectivity
- Library Resources: Physical and digital collection adequacy
- Maintenance: Infrastructure upkeep and utilization

#### 5. Student Support and Progression (130 points)
- Student Services: Counseling, mentoring, and support systems
- Progression Tracking: Academic performance monitoring
- Placement Support: Career guidance and job placement
- Alumni Engagement: Graduate tracking and involvement

#### 6. Governance, Leadership and Management (100 points)
- Leadership Quality: Vision, mission, and strategic planning
- Academic Calendar: Systematic planning and execution
- Financial Management: Resource allocation and utilization
- Quality Assurance: Internal quality systems and processes

#### 7. Institutional Values and Best Practices (70 points)
- Institutional Values: Ethics, transparency, and social responsibility
- Environmental Consciousness: Green practices and sustainability
- Inclusivity: Diversity and equal opportunity provisions
- Professional Ethics: Integrity in academic and administrative practices

## NIRF Ranking Parameters

### Five Key Parameters

#### 1. Teaching, Learning & Resources (TLR) - 30%
- Faculty-Student Ratio: Optimal teaching capacity
- Faculty with PhD: Academic qualification levels
- Financial Resources: Per student expenditure
- Library and Computing Resources: Learning infrastructure

#### 2. Research and Professional Practice (RP) - 30%
- Publications: Research output quality and quantity
- Citation Impact: Research influence and visibility
- Patents: Innovation and intellectual property creation
- Consultancy Income: Industry collaboration and knowledge transfer

#### 3. Graduation Outcomes (GO) - 20%
- Placement Rate: Employment success of graduates
- Median Salary: Economic value of education
- Higher Studies: Proportion pursuing advanced education
- Entrepreneurship: Start-up creation by alumni

#### 4. Outreach and Inclusivity (OI) - 10%
- Regional Diversity: Student geographic distribution
- Gender Diversity: Women participation across programs
- Economic Diversity: Support for economically disadvantaged students
- Specially Abled Students: Accessibility and inclusion measures

#### 5. Perception (PR) - 10%
- Academic Peer Review: Expert opinion on institutional quality
- Employer Feedback: Graduate performance in workplace
- Public Perception: General reputation and recognition

## PRATHAM's Automated Compliance Tracking

### Real-Time Data Collection
- Student Activity Monitoring: Automatic tracking of academic and co-curricular activities
- Faculty Performance Metrics: Research output, teaching evaluations, and professional development
- Infrastructure Utilization: Space and resource usage analytics
- Financial Integration: Budget allocation and expenditure tracking

### Predictive Analytics
- Trend Analysis: Historical data patterns for strategic planning
- Risk Assessment: Early warning systems for compliance gaps
- Benchmarking: Comparison with peer institutions
- Forecasting: Projected compliance scores based on current trajectory

### Automated Reporting
- NAAC Self-Study Reports: Pre-populated documentation with evidence
- NIRF Data Collection: Automated submission-ready formats
- Quality Enhancement: Recommendations for improvement areas
- Evidence Management: Digital documentation and artifact storage

## Dashboard Features for Administrators

### Executive Summary View
- Compliance Score Overview: Current status across all parameters
- Trend Indicators: Performance trajectory and projections
- Risk Alerts: Areas requiring immediate attention
- Action Items: Prioritized recommendations for improvement

### Detailed Analytics
- Criterion-wise Breakdown: Deep dive into specific areas
- Comparative Analysis: Historical trends and peer comparisons
- Student Success Metrics: Graduation rates, placement statistics
- Faculty Excellence Indicators: Research output, teaching effectiveness

### Evidence Repository
- Document Management: Organized storage of compliance evidence
- Audit Trail: Change tracking and version control
- Collaboration Tools: Team-based evidence compilation
- Export Capabilities: Report generation for accreditation submissions

## Best Practices for Compliance Management

### Continuous Monitoring
- Monthly Reviews: Regular assessment of key indicators
- Stakeholder Engagement: Faculty, student, and alumni feedback integration
- Process Improvement: Iterative enhancement of systems and procedures
- Technology Updates: Regular system upgrades and feature additions

### Strategic Planning
- Gap Analysis: Identification of improvement areas
- Resource Allocation: Targeted investment in weak parameters
- Timeline Management: Systematic approach to accreditation cycles
- Change Management: Institutional culture alignment with quality goals

## Common Compliance Challenges and Solutions

### Data Quality Issues
- Problem: Incomplete or inaccurate data collection
- Solution: Automated validation rules and mandatory field requirements

### Faculty Engagement
- Problem: Low participation in research and innovation activities
- Solution: Incentive systems and professional development support

### Student Progression Tracking
- Problem: Limited visibility into post-graduation outcomes
- Solution: Alumni engagement platforms and employer feedback systems

### Infrastructure Documentation
- Problem: Inadequate evidence of facility utilization and maintenance
- Solution: IoT sensors and automated facility management systems`,
      steps: [
        "Access the Compliance Dashboard from the admin panel",
        "Review current NAAC and NIRF scores and trends",
        "Identify areas requiring improvement using the risk assessment tool",
        "Generate detailed reports for specific criteria or parameters",
        "Set up automated alerts for compliance threshold breaches",
        "Configure data collection settings for automatic updates",
        "Export compliance reports for accreditation submissions",
        "Schedule regular compliance review meetings with stakeholders",
      ],
      tips: [
        "Set up monthly compliance review meetings to track progress",
        "Use predictive analytics to plan for upcoming accreditation cycles",
        "Engage faculty and staff in understanding their role in compliance",
        "Regularly backup compliance data and evidence repositories",
        "Stay updated with changing NAAC and NIRF guidelines through system notifications",
      ],
      relatedArticles: ["5"],
    },
    {
      id: "5",
      title: "Troubleshooting Login Issues",
      description: "Common solutions for authentication and role switching problems.",
      category: "troubleshooting",
      readTime: "4 min",
      popular: true,
      content: `Login and authentication issues can be frustrating, but most problems have quick solutions. This guide covers the most common issues and their step-by-step resolutions.

## Common Login Problems

### Issue 1: "Invalid Credentials" Error
This is the most frequent issue users encounter.

Possible Causes:
- Incorrect email address or password
- Caps Lock is enabled
- Copy-pasted credentials with extra spaces
- Account has been deactivated

Solutions:
1. Double-check your email address: Ensure you're using the correct institutional email
2. Verify password: Passwords are case-sensitive
3. Clear browser cache: Old cached data can interfere with login
4. Try incognito/private browsing: This eliminates browser-related issues
5. Use the password reset feature: Click "Forgot Password" to reset your credentials

### Issue 2: Role Switching Problems
Users sometimes can't switch between student, admin, or government roles.

Common Scenarios:
- Role switching button is grayed out
- Switched role but interface doesn't update
- Don't have access to expected role

Solutions:
1. Refresh the page: Sometimes a simple refresh resolves interface updates
2. Clear local storage: Browser storage might contain outdated role information
3. Log out and log back in: Complete session reset
4. Contact administrator: You might not have permissions for the desired role

### Issue 3: Session Timeout
Users get logged out unexpectedly or can't stay logged in.

Why This Happens:
- Security timeout after inactivity
- Browser privacy settings
- Network connectivity issues
- System maintenance

Solutions:
1. Check "Remember Me": If available, this extends session duration
2. Adjust browser settings: Allow cookies from PRATHAM domain
3. Stable internet connection: Ensure consistent network connectivity
4. Update browser: Old browsers may have compatibility issues

### Issue 4: Two-Factor Authentication Problems
Issues with 2FA codes or authentication apps.

Common Problems:
- 2FA code not working
- Lost access to authentication device
- Time synchronization issues

Solutions:
1. Check time settings: Ensure device time is correct
2. Use backup codes: Access your saved backup authentication codes
3. Resync authenticator app: Remove and re-add PRATHAM to your 2FA app
4. Contact IT support: For device replacement or 2FA reset

## Browser-Specific Issues

### Google Chrome
- Clear browsing data: Settings > Privacy > Clear browsing data
- Disable extensions: Some extensions can interfere with authentication
- Update browser: Ensure you're using the latest version

### Mozilla Firefox
- Clear cookies and site data: Options > Privacy & Security
- Disable tracking protection: Sometimes blocks legitimate login requests
- Reset Firefox: If problems persist, consider a browser reset

### Safari (Mac)
- Manage website data: Safari > Preferences > Privacy
- Check cross-site tracking: Disable "Prevent cross-site tracking" temporarily
- Clear cache: Develop menu > Empty Caches

### Microsoft Edge
- Clear browser data: Settings > Privacy > Choose what to clear
- Check security settings: Ensure PRATHAM is not blocked
- Reset settings: Advanced > Reset and cleanup

## Mobile App Issues

### iOS Troubleshooting
- Force close app: Double-tap home button and swipe up on PRATHAM
- Restart device: Power off and on your iPhone/iPad
- Update app: Check App Store for updates
- Reinstall app: Delete and reinstall from App Store

### Android Troubleshooting
- Clear app cache: Settings > Apps > PRATHAM > Storage > Clear Cache
- Clear app data: (Warning: This will log you out)
- Update app: Check Google Play Store
- Check permissions: Ensure app has necessary permissions

## Network and Connectivity Issues

### Campus Network Problems
- Use campus Wi-Fi: Ensure you're connected to official institutional network
- VPN conflicts: Disconnect VPN if experiencing issues
- Firewall restrictions: Contact IT if PRATHAM is blocked
- Bandwidth limitations: Try during off-peak hours

### Home Network Issues
- Router restart: Unplug router for 30 seconds, then reconnect
- Check internet speed: Ensure adequate bandwidth
- DNS settings: Try using Google DNS (8.8.8.8, 8.8.4.4)
- Contact ISP: If persistent connectivity issues

## Account-Related Problems

### New Account Issues
- Account activation: Check email for activation link
- Spam folder: Activation emails might be filtered
- Typo in email: Verify email address during registration
- Institution approval: Some accounts require admin approval

### Password Reset Problems
- Check spam/junk folder: Reset emails might be filtered
- Wait time: Allow 5-10 minutes for email delivery
- Multiple attempts: Don't request multiple resets quickly
- Contact support: If no email received after 30 minutes

## Advanced Troubleshooting

### Browser Console Debugging
For technical users, browser console can provide helpful error information:

1. Open developer tools: F12 or right-click > Inspect
2. Go to Console tab: Look for error messages in red
3. Refresh page: Reproduce the login issue
4. Take screenshot: Of any error messages for support team

### System Status Checking
- Check PRATHAM status page: System-wide issues are announced here
- Social media updates: Follow official accounts for maintenance announcements
- Contact support: Report if you suspect system-wide issues

## Prevention Tips

### Best Practices
- Use strong, unique passwords: Don't reuse passwords from other sites
- Keep browsers updated: Latest versions have better security and compatibility
- Regular password changes: Update passwords every 6-12 months
- Backup authentication: Save backup codes in secure location
- Multiple browsers: Test login in different browsers if issues arise

### Security Recommendations
- Use official links: Always access PRATHAM through official institutional links
- Verify URL: Check that you're on the correct PRATHAM domain
- Log out properly: Use the logout button rather than just closing browser
- Public computers: Never save passwords on shared devices
- Report suspicious activity: Contact security team if you suspect unauthorized access

## When to Contact Support

### Contact IT Support If:
- Issues persist after trying all troubleshooting steps
- You suspect your account has been compromised
- You need to change your institutional email address
- Multiple users report similar issues
- You encounter error messages not covered in this guide

### What Information to Provide:
- Exact error messages (screenshots helpful)
- Browser and version you're using
- Operating system (Windows, Mac, iOS, Android)
- Steps you've already tried
- Time when the issue first occurred
- Your institutional email address`,
      steps: [
        "Identify the specific type of login issue you're experiencing",
        "Try the browser-specific troubleshooting steps for your browser",
        "Clear your browser cache and cookies for the PRATHAM site",
        "Attempt to log in using an incognito/private browser window",
        "If using 2FA, verify your device time is correct",
        "Try the password reset feature if credential issues persist",
        "Contact IT support if problems continue after troubleshooting",
      ],
      tips: [
        "Keep your browser updated to the latest version for best compatibility",
        "Save backup authentication codes in a secure location",
        "Use a password manager to avoid typing errors",
        "Test your login from different devices to isolate the problem",
        "Bookmark the official PRATHAM login page to avoid phishing sites",
      ],
      relatedArticles: ["1", "4"],
    },
  ]

  const categories = [
    { id: "all", label: "All Topics", count: helpArticles.length },
    {
      id: "getting-started",
      label: "Getting Started",
      count: helpArticles.filter((a) => a.category === "getting-started").length,
    },
    { id: "features", label: "Features", count: helpArticles.filter((a) => a.category === "features").length },
    {
      id: "troubleshooting",
      label: "Troubleshooting",
      count: helpArticles.filter((a) => a.category === "troubleshooting").length,
    },
    { id: "advanced", label: "Advanced", count: helpArticles.filter((a) => a.category === "advanced").length },
  ]

  const filteredArticles = helpArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleArticleClick = (article: HelpArticle) => {
    setSelectedArticle(article)
  }

  const handleBackToList = () => {
    setSelectedArticle(null)
  }

  const renderArticleContent = (content: string) => {
    // Split content by double newlines to get paragraphs/sections
    const sections = content.split("\n\n")
    
    return sections.map((section, index) => {
      const trimmed = section.trim()
      
      // Skip empty sections
      if (!trimmed) return null
      
      // Handle different heading levels
      if (trimmed.startsWith("#### ")) {
        return (
          <motion.h5
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-base font-semibold mt-6 mb-3 text-foreground border-b border-border/30 pb-2"
          >
            {trimmed.replace(/^####\s/, "").trim()}
          </motion.h5>
        )
      }
      
      if (trimmed.startsWith("### ")) {
        return (
          <motion.h4
            key={index}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-lg font-semibold mt-8 mb-4 text-foreground flex items-center gap-2"
          >
            <div className="w-1 h-6 bg-primary rounded-full" />
            {trimmed.replace(/^###\s/, "").trim()}
          </motion.h4>
        )
      }
      
      if (trimmed.startsWith("## ")) {
        return (
          <motion.h3
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-xl font-bold mt-10 mb-6 text-primary flex items-center gap-3 border-l-4 border-primary pl-4 bg-primary/5 py-3 rounded-r-lg"
          >
            <Sparkles className="h-5 w-5" />
            {trimmed.replace(/^##\s/, "").trim()}
          </motion.h3>
        )
      }
      
      // Handle bullet lists
      if (trimmed.includes("\n-") || trimmed.startsWith("-")) {
        const lines = trimmed.split("\n")
        const listItems: string[] = []
        let currentItem = ""
        
        lines.forEach(line => {
          if (line.trim().startsWith("-")) {
            if (currentItem) listItems.push(currentItem.trim())
            currentItem = line.replace(/^-\s*/, "")
          } else if (currentItem && line.trim()) {
            currentItem += " " + line.trim()
          }
        })
        
        if (currentItem) listItems.push(currentItem.trim())
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <ul className="space-y-2">
              {listItems.map((item, itemIndex) => {
                // Process the entire item for markdown first
                const processedItem = item
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                  .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground border border-border/30">$1</code>')
                
                // Check if processed item has a title (before colon)
                const colonIndex = processedItem.indexOf(":")
                const hasBoldTitle = colonIndex > 0 && colonIndex < 80 // Reasonable title length
                
                return (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + itemIndex * 0.02 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-all duration-200 group border border-transparent hover:border-border/30"
                  >
                    <div className="mt-1.5 shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary group-hover:scale-125 group-hover:bg-primary/80 transition-all duration-200" />
                    </div>
                    <div className="flex-1 min-w-0">
                      {hasBoldTitle ? (
                        <div className="text-sm leading-relaxed">
                          <span 
                            dangerouslySetInnerHTML={{
                              __html: processedItem.substring(0, colonIndex)
                            }}
                            className="font-semibold text-foreground block mb-1"
                          />
                          <span 
                            dangerouslySetInnerHTML={{
                              __html: processedItem.substring(colonIndex + 1).trim()
                            }}
                            className="text-muted-foreground"
                          />
                        </div>
                      ) : (
                        <span 
                          className="text-muted-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: processedItem
                          }}
                        />
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )
      }
      
      // Handle numbered lists
      if (/^\d+\.\s/.test(trimmed) || trimmed.includes("\n1.")) {
        const lines = trimmed.split("\n").filter(line => line.trim())
        const numberedItems = lines.filter(line => /^\d+\.\s/.test(line.trim()))
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6"
          >
            <ol className="space-y-3">
              {numberedItems.map((item, itemIndex) => {
                const cleanItem = item.replace(/^\d+\.\s*/, "")
                const [title, ...description] = cleanItem.split(":")
                
                return (
                  <motion.li
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 + itemIndex * 0.02 }}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/20 transition-all duration-200 group border border-transparent hover:border-border/30"
                  >
                    <div className="mt-0.5 shrink-0">
                      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white transition-all duration-200">
                        {itemIndex + 1}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      {description.length > 0 ? (
                        <>
                          <span 
                            className="font-semibold text-foreground text-sm block mb-1"
                            dangerouslySetInnerHTML={{
                              __html: title.replace(/^\*\*(.*)\*\*$/, "$1")
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>')
                            }}
                          />
                          <span 
                            className="text-muted-foreground text-sm leading-relaxed"
                            dangerouslySetInnerHTML={{
                              __html: description.join(":").trim()
                                .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                                .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground border border-border/30">$1</code>')
                            }}
                          />
                        </>
                      ) : (
                        <span 
                          className="text-muted-foreground text-sm leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: cleanItem
                              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                              .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground border border-border/30">$1</code>')
                          }}
                        />
                      )}
                    </div>
                  </motion.li>
                )
              })}
            </ol>
          </motion.div>
        )
      }
      
      // Handle status indicators and emoji content
      if (trimmed.includes("ðŸŸ¢") || trimmed.includes("ðŸŸ¡") || trimmed.includes("ðŸ”µ") || trimmed.includes("ðŸ”´") || trimmed.includes("âšª")) {
        const lines = trimmed.split("\n").filter(line => line.trim())
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="mb-6 p-4 bg-muted/20 rounded-lg border border-border/30"
          >
            <div className="space-y-2">
              {lines.map((line, lineIndex) => (
                <div key={lineIndex} className="flex items-center gap-3 text-sm">
                  <span className="text-lg">{line.match(/[ðŸŸ¢ðŸŸ¡ðŸ”µðŸ”´âšª]/)?.[0]}</span>
                  <span 
                    className="text-muted-foreground"
                    dangerouslySetInnerHTML={{
                      __html: line
                        .replace(/[ðŸŸ¢ðŸŸ¡ðŸ”µðŸ”´âšª]\s*/, "")
                        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
                        .replace(/`([^`]+)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-xs font-mono text-foreground">$1</code>')
                    }}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        )
      }
      
      // Handle code blocks or special formatting
      if (trimmed.includes("`") && trimmed.includes("`")) {
        const processedText = trimmed.replace(/`([^`]+)`/g, 
          '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground">$1</code>'
        )
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-sm text-muted-foreground mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedText }}
          />
        )
      }
      
      // Handle bold text patterns and inline formatting
      const hasBoldText = trimmed.includes("**")
      const hasCodeSnippets = trimmed.includes("`") && !trimmed.startsWith("`") // inline code, not code blocks
      
      if (hasBoldText || hasCodeSnippets) {
        let processedText = trimmed
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
          .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground border border-border/30">$1</code>')
          .replace(/\*([^*]+)\*/g, '<em class="italic text-foreground/90">$1</em>') // Handle single asterisk italic
        
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="text-sm text-muted-foreground mb-4 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: processedText }}
          />
        )
      }
      
      // Handle section breaks and dividers
      if (trimmed === "---" || trimmed === "***") {
        return (
          <motion.hr
            key={index}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: index * 0.05 }}
            className="my-8 border-t border-border/50"
          />
        )
      }
      
      // Regular paragraphs with better spacing and typography
      return (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="text-sm text-muted-foreground mb-4 leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: trimmed
              .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
              .replace(/`([^`]+)`/g, '<code class="bg-muted px-1.5 py-0.5 rounded text-xs font-mono text-foreground border border-border/30">$1</code>')
              .replace(/\*([^*]+)\*/g, '<em class="italic text-foreground/90">$1</em>')
          }}
        />
      )
    }).filter(Boolean) // Remove null entries
  }

  return (
    <>
      {/* Backdrop Overlay */}
      {isDialogOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsDialogOpen(false)}
        />
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsDialogOpen(true)}
            variant="outline"
            size="sm"
            className="gap-2 bg-transparent hover:bg-primary/10 transition-all duration-200"
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            >
              <HelpCircle className="h-4 w-4" />
            </motion.div>
            Help Center
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent showCloseButton={true} className="!max-w-none !w-screen !h-screen !m-0 !p-0 bg-transparent border-none shadow-none !translate-x-0 !translate-y-0 !left-0 !top-0">
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
          <div className="relative w-full max-w-[95vw] lg:max-w-6xl h-full max-h-[90vh] bg-background/95 backdrop-blur-xl border border-border/50 shadow-2xl rounded-xl overflow-hidden">
            {/* Additional Close Button */}
            <button
              onClick={() => setIsDialogOpen(false)}
              className="absolute top-3 right-3 z-60 p-2 rounded-lg bg-background/80 border border-border/50 hover:bg-muted/80 transition-colors shadow-sm backdrop-blur-sm"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  className="h-4 w-4 text-muted-foreground hover:text-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.div>
            </button>
            <div className="h-full w-full p-4 sm:p-6 overflow-hidden">
        <AnimatePresence mode="wait">
          {!selectedArticle ? (
            // Article List View (Original Layout)
            <motion.div
              key="list"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="pb-3 sm:pb-4 border-b border-border/50 bg-gradient-to-r from-background/80 to-background/60 backdrop-blur-sm rounded-t-lg">
                <DialogTitle className="flex items-center gap-3 text-xl font-bold">
                  <motion.div
                    animate={{ rotateY: [0, 360] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="p-2 rounded-lg bg-primary/10 border border-primary/20 shadow-sm"
                  >
                    <BookOpen className="h-5 w-5 text-primary" />
                  </motion.div>
                  <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    PRATHAM Help Center
                  </span>
                </DialogTitle>
                <p className="text-sm text-muted-foreground/80 mt-2 font-medium">
                  Find answers to common questions and learn how to make the most of your PRATHAM experience.
                </p>
              </DialogHeader>

              <div className="flex flex-col lg:grid lg:grid-cols-[260px_1fr] gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 lg:mt-6 h-full min-h-0">
                {/* Sidebar */}
                <div className="space-y-2 sm:space-y-3 lg:space-y-4 shrink-0 order-1 lg:order-none">
                  {/* Search */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative"
                  >
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search help articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-background/80 border-2 border-border/50 focus:bg-background focus:border-primary/50 transition-all duration-200 shadow-sm backdrop-blur-sm"
                    />
                  </motion.div>

                  {/* Categories - Mobile Horizontal Scroll, Desktop Vertical */}
                  <div className="lg:space-y-2">
                    <div className="flex lg:hidden gap-2 overflow-x-auto pb-2">
                      {categories.map((category, index) => {
                        const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || BookOpen
                        return (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex-shrink-0"
                          >
                            <Button
                              variant={selectedCategory === category.id ? "default" : "ghost"}
                              size="sm"
                              onClick={() => setSelectedCategory(category.id)}
                              className={`whitespace-nowrap transition-all duration-200 font-medium ${
                                selectedCategory === category.id
                                  ? "bg-primary/10 border-2 border-primary/20 shadow-sm"
                                  : "hover:bg-muted/80 border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <IconComponent className="h-3 w-3" />
                                <span className="text-xs">{category.label}</span>
                                <Badge variant="secondary" className="text-xs font-semibold px-1">
                                  {category.count}
                                </Badge>
                              </div>
                            </Button>
                          </motion.div>
                        )
                      })}
                    </div>
                    <div className="hidden lg:block space-y-2">
                      {categories.map((category, index) => {
                        const IconComponent = categoryIcons[category.id as keyof typeof categoryIcons] || BookOpen
                        return (
                          <motion.div
                            key={category.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            whileHover={{ x: 5, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Button
                              variant={selectedCategory === category.id ? "default" : "ghost"}
                              size="sm"
                              onClick={() => setSelectedCategory(category.id)}
                              className={`w-full justify-between transition-all duration-200 font-medium ${
                                selectedCategory === category.id
                                  ? "bg-primary/10 border-2 border-primary/20 shadow-sm"
                                  : "hover:bg-muted/80 border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <IconComponent className="h-4 w-4" />
                                <span className="text-sm">{category.label}</span>
                              </div>
                              <Badge variant="secondary" className="text-xs font-semibold px-2">
                                {category.count}
                              </Badge>
                            </Button>
                          </motion.div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-h-0 order-2 lg:order-none">
                  <div className="h-[calc(90vh-200px)] sm:h-[calc(90vh-180px)] lg:h-[calc(90vh-160px)] overflow-y-auto pr-1 sm:pr-2 space-y-2 sm:space-y-3 lg:space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border/50 hover:scrollbar-thumb-border">
                  {filteredArticles.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-center py-12"
                    >
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                        className="mb-6"
                      >
                        <BookOpen className="h-16 w-16 text-muted-foreground mx-auto" />
                      </motion.div>
                      <h3 className="font-semibold text-lg mb-2">No articles found</h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Try adjusting your search terms or browse different categories to find what you're looking for.
                      </p>
                    </motion.div>
                  ) : (
                    filteredArticles.map((article, index) => {
                      const IconComponent = categoryIcons[article.category]
                      return (
                        <motion.div
                          key={article.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleArticleClick(article)}
                          className="cursor-pointer"
                        >
                          <Card className="group glass hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 border-border/50 hover:border-primary/40 bg-background/90 backdrop-blur-sm shadow-lg">
                            <CardContent className="p-3 sm:p-4 lg:p-6">
                                <div className="flex items-start gap-2 sm:gap-3 lg:gap-4">
                                  <motion.div
                                    whileHover={{ rotate: 360, scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className={`p-2 sm:p-3 rounded-xl ${categoryColors[article.category]} border-2 flex-shrink-0 shadow-sm`}
                                  >
                                  <IconComponent className="h-5 w-5" />
                                </motion.div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3 mb-3">
                                    <h3 className="font-bold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors leading-tight flex-1">
                                      {article.title}
                                    </h3>
                                    <div className="flex items-center gap-2 shrink-0">
                                      {article.popular && (
                                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs font-medium">
                                          <Star className="h-3 w-3 mr-1 fill-current" />
                                          Popular
                                        </Badge>
                                      )}
                                      <motion.div
                                        whileHover={{ scale: 1.2, rotate: 90 }}
                                        transition={{ duration: 0.2 }}
                                      >
                                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                      </motion.div>
                                    </div>
                                  </div>
                                  <p className="text-muted-foreground text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed line-clamp-2 sm:line-clamp-none">
                                    {article.description}
                                  </p>
                                  <div className="flex items-center gap-3 text-xs">
                                    <Badge
                                      variant="outline"
                                      className={`text-xs ${categoryColors[article.category]} border-2 capitalize font-medium px-2 py-1`}
                                    >
                                      {article.category.replace("-", " ")}
                                    </Badge>
                                    <div className="flex items-center gap-1 text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      <span className="font-medium">{article.readTime} read</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })
                  )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Article Detail View
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      handleBackToList()
                    }}
                    className="cursor-pointer p-2 hover:bg-muted/50 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5 text-primary" />
                  </motion.div>
                  <div className="flex-1">
                    <DialogTitle className="text-lg font-semibold">{selectedArticle.title}</DialogTitle>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <Badge
                        variant="outline"
                        className={`text-xs ${categoryColors[selectedArticle.category]} border capitalize`}
                      >
                        {selectedArticle.category.replace("-", " ")}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {selectedArticle.readTime}
                      </div>
                      {selectedArticle.popular && (
                        <Badge variant="secondary" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 text-xs">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          Popular
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <ScrollArea className="h-[calc(90vh-120px)] sm:h-[calc(90vh-110px)] lg:h-[calc(90vh-100px)] mt-2 sm:mt-3 lg:mt-4 pr-1 sm:pr-2">
                <div className="px-1 sm:px-2">
                <div className="space-y-6">
                  {/* Article Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-muted-foreground leading-relaxed"
                  >
                    {selectedArticle.description}
                  </motion.p>

                  {/* Article Content */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-sm max-w-none"
                  >
                    {renderArticleContent(selectedArticle.content)}
                  </motion.div>

                  {/* Steps Section */}
                  {selectedArticle.steps && selectedArticle.steps.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Card className="glass border-primary/20">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: [0, 360] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                              <Settings className="h-4 w-4 text-primary" />
                            </motion.div>
                            Step-by-Step Guide
                          </h4>
                          <div className="space-y-3">
                            {selectedArticle.steps.map((step, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 + index * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors group"
                              >
                                <div className="flex-shrink-0">
                                  <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center text-xs font-semibold text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    {index + 1}
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Tips Section */}
                  {selectedArticle.tips && selectedArticle.tips.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Card className="glass border-accent/20">
                        <CardContent className="p-6">
                          <h4 className="font-semibold mb-4 flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                            >
                              <Lightbulb className="h-4 w-4 text-accent" />
                            </motion.div>
                            Pro Tips
                          </h4>
                          <div className="space-y-3">
                            {selectedArticle.tips.map((tip, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.7 + index * 0.1 }}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors group"
                              >
                                <div className="flex-shrink-0 mt-1">
                                  <div className="w-2 h-2 rounded-full bg-accent group-hover:scale-125 transition-transform" />
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">{tip}</p>
                              </motion.div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )}

                  {/* Related Articles */}
                  {selectedArticle.relatedArticles && selectedArticle.relatedArticles.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                    >
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        Related Articles
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedArticle.relatedArticles.map((relatedId, index) => {
                          const relatedArticle = helpArticles.find(a => a.id === relatedId)
                          if (!relatedArticle) return null
                          const IconComponent = categoryIcons[relatedArticle.category]
                          return (
                            <motion.div
                              key={relatedId}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.9 + index * 0.1 }}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleArticleClick(relatedArticle)}
                              className="cursor-pointer"
                            >
                              <Card className="glass hover:shadow-md transition-all duration-200">
                                <CardContent className="p-4">
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${categoryColors[relatedArticle.category]} border flex-shrink-0`}>
                                      <IconComponent className="h-3 w-3" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <h5 className="font-medium text-sm mb-1 hover:text-primary transition-colors">
                                        {relatedArticle.title}
                                      </h5>
                                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <Clock className="h-3 w-3" />
                                        {relatedArticle.readTime}
                                        {relatedArticle.popular && (
                                          <Star className="h-3 w-3 fill-current text-yellow-500" />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </>
  )
}
