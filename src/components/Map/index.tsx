import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useResizeDetector } from 'react-resize-detector'

import MapTopBar from '@components/TopBar'

import { AppConfig } from '@lib/AppConfig'
import MarkerCategories from '@lib/MarkerCategories'
import { Places } from '@lib/Places'

import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarker from './useMarker'

const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./ui/CustomMarker')).CustomMarker, {
  ssr: false,
})
const LocateButton = dynamic(async () => (await import('./ui/LocateButton')).LocateButton, {
  ssr: false,
})
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()
  const { markerCenterPos, markerMinZoom } = useMarker({
    locations: Places,
    map,
  })

  const {
    width: viewportWidth,
    height: viewportHeight,
    ref: viewportRef,
  } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 400,
  })

  const isLoading = !map || !leafletWindow || !viewportWidth

  // resize: invalidate size if viewport changed
  useEffect(() => {
    if (map && (viewportWidth || viewportHeight)) {
      map.invalidateSize()
    }
  }, [map, viewportWidth, viewportHeight])

  // init: center / zoom map based on markers locations
  useEffect(() => {
    if (map && leafletWindow) {
      map.flyTo(markerCenterPos, markerMinZoom, { animate: false })
      map.setMinZoom(markerMinZoom)
    }
  }, [map, leafletWindow])

  return (
    <div className="h-full w-full absolute overflow-hidden" ref={viewportRef}>
      <MapTopBar />
      <div
        className={`absolute w-full left-0 transition-opacity ${isLoading ? 'opacity-0' : 'opacity-1 '}`}
        style={{
          top: AppConfig.ui.topBarHeight,
          width: viewportWidth ?? '100%',
          height: viewportHeight ? viewportHeight - AppConfig.ui.topBarHeight : '100%',
        }}
      >
        <LeafletMap center={markerCenterPos} zoom={markerMinZoom} maxZoom={AppConfig.maxZoom}>
          {!isLoading ? (
            <>
              <CenterToMarkerButton center={markerCenterPos} zoom={markerMinZoom} />
              <LocateButton />
              {Places.map(item => (
                <CustomMarker
                  icon={MarkerCategories[item.category].icon}
                  color={MarkerCategories[item.category].color}
                  key={(item.position as number[]).join('')}
                  position={item.position}
                />
              ))}
            </>
          ) : (
            <>l</>
          )}
        </LeafletMap>
      </div>
    </div>
  )
}

// pass through to get context in <MapInner>
const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
