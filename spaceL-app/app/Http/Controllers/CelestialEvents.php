<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DOMDocument;
use DOMXPath;

class CelestialEvents extends Controller
{
    public function getCelestialEvents()
    {
        return response()->json([
            'events' => $this->fetchCelestialEvents()
        ]);
    }

    private function fetchCelestialEvents()
    {
        $events = [];
        $years = range(2010, 2030);
        
        foreach ($years as $year) {
            $websiteScrapeURL = "http://www.seasky.org/astronomy/astronomy-calendar-{$year}.html";
            $html = file_get_contents($websiteScrapeURL);
            $dom = new DOMDocument();
            @$dom->loadHTML($html);
            $xpath = new DOMXPath($dom);

            $eventItems = $xpath->query('//div[@id="right-column-content"]//ul/li');

            foreach ($eventItems as $item) {
                $dateSpan = $xpath->query('.//span[@class="date-text"]', $item)->item(0);
                $titleSpan = $xpath->query('.//span[@class="title-text"]', $item)->item(0);
                
                if ($dateSpan && $titleSpan) {
                    $date = trim($dateSpan->textContent);
                    $title = trim($titleSpan->textContent);
                    
                    // Extract links from the item
                    $links = $xpath->query('.//a', $item);
                    $linkData = [];
                    foreach ($links as $link) {
                        $linkData[] = [
                            'url' => $link->getAttribute('href'),
                            'text' => trim($link->textContent)
                        ];
                    }
                    
                    // Get clean description without the date/title prefix and format with links
                    $description = trim($item->textContent);
                    $description = trim(str_replace([$date . ' - ' . $title, $date, $title], '', $description));
                    
                    // Remove the link text from description since we'll format it separately
                    foreach ($linkData as $linkInfo) {
                        $description = str_replace('(' . $linkInfo['text'] . ')', '', $description);
                    }
                    $description = trim($description);
                    
                    // Format links as HTML for display
                    if (!empty($linkData)) {
                        $description .= "\n\nUseful Links:";
                        foreach ($linkData as $linkInfo) {
                            $description .= "\n• " . $linkInfo['text'] . ": " . $linkInfo['url'];
                        }
                    }

                    $dateParts = explode('-', $date);
                    $startDate = trim($dateParts[0]);
                    $endDate = isset($dateParts[1]) ? trim($dateParts[1]) : $startDate;

                    if (strpos($startDate, ',') !== false) {
                        $pieces = explode(',', $startDate);
                        $monthDay = explode(' ', trim($pieces[0]));
                        $month = $monthDay[0] ?? 'January';
                        $startDay = $monthDay[1] ?? '1';
                        $endDay = trim($pieces[1]);
                    } elseif (preg_match('/^[A-Za-z]+\s+\d+$/', $startDate) && preg_match('/^\d+$/', $endDate)) {
                        $startParts = explode(' ', $startDate);
                        $month = $startParts[0];
                        $startDay = $startParts[1];
                        $endDay = $endDate;
                    } else {
                        $startParts = explode(' ', $startDate);
                        $endParts = explode(' ', $endDate);
                        $month = $startParts[0] ?? 'January';
                        $startDay = $startParts[1] ?? '1';
                        $endDay = $endParts[1] ?? $startDay;
                    }

                    $monthNum = date('m', strtotime($month . " 1"));
                    $startDateFormatted = sprintf('%04d-%02d-%02d', $year, $monthNum, $startDay);
                    $endDateFormatted = sprintf('%04d-%02d-%02d', $year, $monthNum, $endDay);

                    $events[] = [
                        'startDate' => $startDateFormatted,
                        'endDate' => $endDateFormatted,
                        'title' => $title,
                        'description' => $description,
                        'links' => $linkData,
                        'allDay' => true
                    ];
                }
            }
        }

        return $events;
    }
}
