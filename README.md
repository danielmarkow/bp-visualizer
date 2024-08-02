# Blood Pressure Visualizer
Visualize your blood pressure readings strictly client-side for your doctor to check.

## Warning
!!! This is merely a side-project. I can't gurantee that there won't be bugs. Use with care. !!!

# Dev Setup
You need to have current version of `bun` installed. Clone the repo, `cd` into the folder and run `bun install`.

## Upload Format
The measurements must be in the following format for upload. This corresponds to the export format of blood pressure measuring devices by Withings. For example the [BPM Connect](https://www.withings.com/de/de/bpm-connect).
```
2023-10-22 08:59:40,137,86,60
2023-10-22 09:01:59,139,80,62
2023-10-22 21:25:54,136,83,70
2023-10-23 07:24:01,146,88,60
2023-10-23 07:31:11,149,84,58
2023-10-23 14:21:31,135,77,66
...
```

## To Dos
- Plot daily measurements in a useful chart
- Checkout Withings API for data retrieval