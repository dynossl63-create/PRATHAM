"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Calendar, MapPin, Users, Sparkles, ChevronRight, Search, Filter, Clock, Star } from "lucide-react"
import { motion } from "framer-motion"
import { toast } from "sonner"

interface Event {
  id: number
  title: string
  date: string
  type: string
  recommended: boolean
}

interface OpportunityCarouselProps {
  events: Event[]
}

export function OpportunityCarousel({ events }: OpportunityCarouselProps) {
  const [showAllOpportunities, setShowAllOpportunities] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [registeredEvents, setRegisteredEvents] = useState<Set<number>>(new Set())
  // Extended list of all opportunities
  const allOpportunities: Event[] = [
    ...events,
    {
      id: 4,
      title: "Blockchain Fundamentals Workshop",
      date: "2024-05-12",
      type: "workshop",
      recommended: true,
    },
    {
      id: 5,
      title: "Digital Marketing Bootcamp",
      date: "2024-05-18",
      type: "bootcamp",
      recommended: false,
    },
    {
      id: 6,
      title: "Cybersecurity Challenge 2024",
      date: "2024-05-25",
      type: "competition",
      recommended: true,
    },
    {
      id: 7,
      title: "UX/UI Design Thinking Session",
      date: "2024-06-02",
      type: "workshop",
      recommended: false,
    },
    {
      id: 8,
      title: "Data Analytics Career Fair",
      date: "2024-06-08",
      type: "networking",
      recommended: true,
    },
    {
      id: 9,
      title: "Mobile Development Hackathon",
      date: "2024-06-15",
      type: "competition",
      recommended: false,
    },
    {
      id: 10,
      title: "Cloud Computing Certification Prep",
      date: "2024-06-22",
      type: "certification",
      recommended: true,
    },
    {
      id: 11,
      title: "Entrepreneurship Pitch Night",
      date: "2024-06-29",
      type: "networking",
      recommended: false,
    },
  ]

  const filteredOpportunities = allOpportunities.filter((opportunity) => {
    const matchesSearch = opportunity.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = 
      selectedFilter === "all" || 
      (selectedFilter === "recommended" && opportunity.recommended) ||
      opportunity.type === selectedFilter
    return matchesSearch && matchesFilter
  })

  const handleRegistration = (eventId: number, eventTitle: string) => {
    if (registeredEvents.has(eventId)) {
      // Unregister
      setRegisteredEvents(prev => {
        const newSet = new Set(prev)
        newSet.delete(eventId)
        return newSet
      })
      toast.success("Unregistered Successfully!", {
        description: `You have been unregistered from "${eventTitle}"`
      })
    } else {
      // Register
      setRegisteredEvents(prev => new Set([...prev, eventId]))
      toast.success("Registration Successful!", {
        description: `You are now registered for "${eventTitle}". Check your email for confirmation details.`
      })
    }
  }

  const renderEventCard = (event: Event, index?: number) => (
    <motion.div
      key={event.id}
      initial={index !== undefined ? { opacity: 0, y: 20 } : {}}
      animate={index !== undefined ? { opacity: 1, y: 0 } : {}}
      transition={index !== undefined ? { delay: index * 0.1 } : {}}
    >
      <Card
        className={`glass hover:neon-glow transition-all duration-300 cursor-pointer ${
          event.recommended ? "border-primary/30" : ""
        }`}
      >
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-sm">{event.title}</h4>
                {event.recommended && (
                  <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Recommended
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  Virtual
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  {Math.floor(Math.random() * 100) + 20}+ attending
                </div>
              </div>
              <Badge variant="outline" className="text-xs capitalize">
                {event.type}
              </Badge>
            </div>
            <Button 
              size="sm" 
              variant={registeredEvents.has(event.id) ? "secondary" : (event.recommended ? "default" : "outline")}
              onClick={() => handleRegistration(event.id, event.title)}
              className={registeredEvents.has(event.id) ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-300" : ""}
            >
              {registeredEvents.has(event.id) ? (
                <>
                  Registered
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              ) : (
                <>
                  Register
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )

  return (
    <>
      <div className="space-y-4">
        {events.map((event) => renderEventCard(event))}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Button 
            variant="outline" 
            className="w-full bg-transparent hover:bg-primary/5 transition-colors"
            onClick={() => setShowAllOpportunities(true)}
          >
            View All Opportunities
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </motion.div>
      </div>

      {/* All Opportunities Dialog */}
      <Dialog open={showAllOpportunities} onOpenChange={setShowAllOpportunities}>
        <DialogContent className="w-[95vw] max-w-6xl h-[90vh] max-h-[90vh] overflow-hidden p-0 m-4 sm:m-6">
          <DialogHeader className="px-4 sm:px-6 py-4 border-b border-border/50 shrink-0">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 sm:gap-3">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span className="truncate">All Learning Opportunities</span>
            </DialogTitle>
          </DialogHeader>

          {/* Search and Filter Bar */}
          <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-border/50 bg-background shrink-0">
            <div className="space-y-3 sm:space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-9 sm:h-10 w-full text-sm sm:text-base"
                />
              </div>
              
              {/* Filter Buttons */}
              <div className="flex gap-1.5 sm:gap-2 flex-wrap">
                {[
                  { id: "all", label: "All" },
                  { id: "recommended", label: "Recommended" },
                  { id: "workshop", label: "Workshops" },
                  { id: "competition", label: "Competitions" },
                  { id: "networking", label: "Networking" },
                ].map((filter) => (
                  <Button
                    key={filter.id}
                    variant={selectedFilter === filter.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedFilter(filter.id)}
                    className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 font-medium whitespace-nowrap"
                  >
                    {filter.id === "recommended" && <Sparkles className="h-3 w-3 mr-1 sm:mr-2" />}
                    <span className="hidden xs:inline sm:inline">{filter.label}</span>
                    <span className="inline xs:hidden sm:hidden">
                      {filter.id === "all" ? "All" : 
                       filter.id === "recommended" ? "Rec" :
                       filter.id === "workshop" ? "Work" :
                       filter.id === "competition" ? "Comp" : "Net"}
                    </span>
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-muted/10 border-b border-border/50 shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium">{filteredOpportunities.length}</span> 
                <span className="hidden xs:inline">opportunities</span>
                <span className="inline xs:hidden">results</span>
                {searchQuery && (
                  <span className="hidden sm:inline"> for <span className="font-medium">"{searchQuery}"</span></span>
                )}
              </p>
              <div className="flex items-center gap-1 sm:gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span className="hidden sm:inline">Updated daily</span>
                <span className="inline sm:hidden">Daily</span>
              </div>
            </div>
          </div>

          {/* Opportunities Grid */}
          <ScrollArea className="flex-1 overflow-auto">
            <div className="p-3 sm:p-4 md:p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
                {filteredOpportunities.map((opportunity, index) => (
                  <motion.div
                    key={opportunity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className={`h-full transition-all duration-200 hover:shadow-md ${
                      opportunity.recommended 
                        ? "border-primary/30 bg-primary/5" 
                        : "border-border/50 hover:border-primary/20"
                    }`}>
                      <CardContent className="p-3 sm:p-4 md:p-5">
                        <div className="space-y-3 sm:space-y-4">
                          {/* Title Section */}
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-2 sm:gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className="font-semibold text-sm sm:text-base leading-tight text-foreground line-clamp-2">
                                  {opportunity.title}
                                </h4>
                                {opportunity.recommended && (
                                  <Badge variant="secondary" className="mt-2 text-xs bg-primary/15 text-primary border-primary/20 w-fit">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    <span className="hidden xs:inline">Recommended</span>
                                    <span className="inline xs:hidden">Rec</span>
                                  </Badge>
                                )}
                              </div>
                              <Button 
                                size="sm" 
                                variant={registeredEvents.has(opportunity.id) ? "secondary" : (opportunity.recommended ? "default" : "outline")}
                                className={`shrink-0 text-xs h-7 sm:h-8 px-2 sm:px-3 ${registeredEvents.has(opportunity.id) ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-300" : ""}`}
                                onClick={() => handleRegistration(opportunity.id, opportunity.title)}
                              >
                                {registeredEvents.has(opportunity.id) ? (
                                  <>
                                    <span className="hidden sm:inline">Registered</span>
                                    <span className="inline sm:hidden">✓</span>
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  </>
                                ) : (
                                  <>
                                    <span className="hidden sm:inline">Register</span>
                                    <span className="inline sm:hidden">Join</span>
                                    <ChevronRight className="h-3 w-3 ml-1" />
                                  </>
                                )}
                              </Button>
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="space-y-1.5 sm:space-y-2">
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                              <span className="truncate">{new Date(opportunity.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                              <span>Virtual</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                              <Users className="h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                              <span className="truncate">{Math.floor(Math.random() * 100) + 20}+ attending</span>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="pt-1 sm:pt-2">
                            <Badge variant="outline" className="text-xs capitalize font-medium px-2 py-1">
                              {opportunity.type}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Empty State */}
            {filteredOpportunities.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 text-center px-4">
                <div className="rounded-full bg-muted/20 p-3 sm:p-4 mb-3 sm:mb-4">
                  <Search className="h-6 w-6 sm:h-8 sm:w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-base sm:text-lg mb-2">No opportunities found</h3>
                <p className="text-muted-foreground max-w-sm text-sm sm:text-base px-2">
                  No opportunities match your current search criteria. Try adjusting your search terms or filters.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-3 sm:mt-4 text-xs sm:text-sm h-8 sm:h-9"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedFilter("all")
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  )
}
