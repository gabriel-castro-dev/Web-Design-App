// src/demos/default.tsx
import { ParallaxComponent } from './parallax-scrolling';

export default function ParallaxDemo() {
  return (
    <>
      <ParallaxComponent />
      <div className="osmo-credits">
        <p className="osmo-credits__p">Resource by <a target="_blank" href="https://www.osmo.supply/" className="osmo-credits__p-a">Osmo</a>
        </p>
      </div>
    </>
  );
}
